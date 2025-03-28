<?php

namespace Modules\Home\Classes;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

/**
 * Classe responsável por consultar os dados dos
 * lotes / monitoramentos informados
 */
class BatchPanel
{
    private $qtyLoadDaysToHere = -30; # Quantidade de dias de carga (created_at) para cá
    private $monitoring = []; # Monitoramentos que entrarão no painel de lotes

    /**
     * @param $debug 'true' vai printar a query na tela | 'false' vai executar a query e retorna seu conteúdo
     */
    function __construct(private $debug = false)
    {
        $this->monitoring = [ # Monitoramentos que entrarão no painel de lotes
            ['name' => 'Stock trade', 'table' => 'stock_trade_batchs_vw', 'permission' => 'stocktrade.manager', 'url' => route('stocktrade_indicator.index')],
            ['name' => 'Pré pagamento', 'table' => 'prepayment_batchs', 'permission' => 'prepayment.manager', 'url' => route('prepayment_batch.index')],
            ['name' => 'Restituição de valor', 'table' => 'restitution_value_batchs', 'permission' => 'restitutionvalue.manager', 'url' => route('restitutionvalue_batch.index')],
            ['name' => 'Contestação FTTH', 'table' => 'ftth_contestation_batchs', 'permission' => 'contestationftth.manager', 'url' => route('contestationftth_batch.index')],
            ['name' => 'Crediv', 'table' => 'crediv_batchs', 'permission' => 'crediv.manager', 'url' => route('crediv_batch.index')],
            ['name' => 'Compra spot', 'table' => 'spot_purchase_batchs', 'permission' => 'spotpurchase.manager', 'url' => route('spotpurchase_batch.index')]
        ];
    }

    /**
     * Quantidade de dias de carga (created_at) para cá
     * 
     * @return Valor absoluto sem o sinal de negativo
     */
    public function getQtyLoadDaysToHere()
    {
        return abs($this->qtyLoadDaysToHere);
    }

    /**
     * Informa se o usuário corrente tem algo para ser mostrado no painel
     */
    public function hasPanel()
    {
        $user = Auth::user();
        $list = array_column($this->monitoring, 'permission');
        $status = false;
        foreach($list as $li){
            if($user->can($li)){
                $status = true;
                break;
            }
            
        }
        return $status;
    }

    /**
     * Pega a query que foi montada e executa
     */
    public function main()
    {
        $sqlFull = $this->setUpQuery();
        return DB::select($sqlFull);
    }

    /**
     * Inicia a montagem da query de acordo com a permissão do usuário logado
     * 
     * return query completa, incluindo os UNION ALL
     */
    private function setUpQuery()
    {
        $user = Auth::user();
        $sql = [];
        foreach((object)$this->monitoring as $mon){
            $res = (object)$mon;
            if($user->can($res->permission)){
                $sql[] = $this->query($res->name, $res->table, $res->url, $res->permission);
            }
        }
        if($this->debug == true){
            echo '<pre>';
            echo implode("\nUNION ALL\n",$sql);
            exit();
        }
        return implode("\nUNION ALL\n",$sql);
    }

    /**
     * Monta query com os dados estatísticos
     * 
     * @param $monitoringName Nome do monitoramento
     * @param $table Tabela do monitoramento
     * @param $url URL de acesso a lista de lotes do monitoramento
     * @param $permission Permissão de acesso ao monitoramento
     * 
     * return Retorna query
     */
    private function query($monitoringName, $table, $url, $permission)
    {
        return "SELECT 
                '{$monitoringName}' AS monitoring, # nome do monitoramento
                (
                    SELECT 
                        DATE_FORMAT(MAX(batch_date), '%d/%m/%y')
                    FROM {$table}
                ) AS name_last_load, # nome último lote gerado / carregado
                (
                    SELECT 
                        DATE_FORMAT(MAX(DATE(updated_at)), '%d/%m/%y')
                    FROM {$table} 
                    WHERE count_undefined = 0
                ) AS dt_last_complete_download, # data última baixa completa
                (
                    SELECT 
                        DATE_FORMAT(MAX(batch_date), '%d/%m/%y')
                    FROM {$table} 
                    WHERE 
                        downloaded = 'yes' 
                        AND count_undefined = 0 
                        ORDER BY updated_at DESC
                ) AS name_last_complete_download, # último lote baixado completamente
                (
                    SELECT 
                        COUNT(*) 
                    FROM {$table} 
                    WHERE downloaded = 'no'
                ) AS qty_pending_lots_low, # qtd. lote pendentes de baixa em aberto
                (
                    SELECT 
                        REPLACE(FORMAT(SUM(count_total),0),',','.')
                    FROM {$table} 
                    WHERE downloaded = 'no'
                ) AS qty_pending_cases, # qtd. total de registros não baixados em lotes pendentes de baixa
                ( /*
                    Média de dias passados entre a geração do lote e baixa de fato dos lotes
                    que foram gerados da quantidade de dias informados para cá
                    */
                    SELECT
                        CASE
                        	WHEN ROUND(SUM(DATEDIFF(DATE(updated_at), DATE(created_at))) / COUNT(*),1) IS NULL
								THEN '+{$this->getQtyLoadDaysToHere()}d s/baixa'
						ELSE ROUND(SUM(DATEDIFF(DATE(updated_at), DATE(created_at))) / COUNT(*),1) END
                    FROM {$table}
                    WHERE downloaded = 'yes'
                    AND count_undefined = 0
                    AND DATE(updated_at) >= DATE_ADD(CURDATE(), INTERVAL {$this->qtyLoadDaysToHere} DAY)
                ) AS qty_low_average_days, # dias em médias para baixa completa do lote
                ( # Quantidade de lotes baixados recentemente da quantidade de dias informados para cá
                    SELECT
                        COUNT(*)
                    FROM {$table}
                    WHERE downloaded = 'yes'
                    AND count_undefined = 0
                    AND DATE(updated_at) >= DATE_ADD(CURDATE(), INTERVAL {$this->qtyLoadDaysToHere} DAY)
                ) AS qty_recently_downloaded,
                ( # Pega os perfis que tem acessa a funcionalidade
					SELECT
                	    GROUP_CONCAT(r.name) resposaveis
                	FROM roles r
                	INNER JOIN role_has_permissions rp ON rp.role_id = r.id
                	INNER JOIN permissions p ON p.id = rp.permission_id
                	WHERE p.name = '{$permission}'
				) AS responsible,
                '{$url}' AS url # URL da página de lotes
                FROM DUAL";
    }
}