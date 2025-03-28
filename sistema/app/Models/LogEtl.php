<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class LogEtl extends Model
{
    use HasFactory;
    protected $table = 'log_etl';
    public $identification = ''; # Idenficação do log
    public $createdAt = ''; # Dia do log
    #public $timestamps= false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'identification',
        'type', # enum('EXTRACT','TRANSFORM','LOAD')
        'source',
        'file',
        'number_lines',
        'qtd_selected_lines',
        'description',
        'status' # enum('OK','WARNING','ERROR')
    ];

    public function __construct($identification='', $createdAt ='')
    {
        $this->identification = $identification; # Idenficação do log
        $this->createdAt = ($createdAt != '') ? $createdAt: date('Y-m-d'); # Dia do log
   
    }

    private function checkIdentification()
    {
        if($this->identification == ''){
            throw new \Exception('Model Log ETL: É obrigatório informar identification no construtor');
        }
    }

    public function getCreatedAtAttribute($value)
    {
        return date('d/m/y H:i:s', strtotime($value));
    }

    /**
     * Obtem todas as datas do log informado
     * 
     * @return Lista de data presentes no log
     */
    public function getDatesLog()
    {
        $this->checkIdentification();
        return DB::table('log_etl')
                ->select(DB::raw('DISTINCT DATE(created_at) as created_at'))
                ->where('identification', 'LIKE', $this->identification.'%')
                ->where(DB::RAW('DATE(created_at)'),'!=',date('Y-m-d'))
                ->orderByRaw('DATE(created_at) DESC')
                ->get()->pluck('created_at')->prepend(date('Y-m-d'));
    }

    /**
     * Obtem todo o log do indentificar e data informado
     * 
     * @param $identification Identificação do log
     * @param $createdAt Data do log
     * 
     * @return Lista com todo o detalhe do log
     */
    public function getDetailLog()
    {
        $this->checkIdentification();
        return DB::table('log_etl')
                ->select(
                    'id',
                    'identification', 
                    'type', 
                    'source',
                    'file',
                    'number_lines',
                    'qtd_selected_lines',
                    'description',
                    'status',
                    DB::raw('DATE_FORMAT(created_at, "%d/%m/%y %H:%i:%s") as created_at')
                    )
                ->where('created_at', 'like', $this->createdAt.'%')
                ->where('identification', 'LIKE', $this->identification.'%')    
                ->orderBy('created_at')
                ->orderBy('identification')     
                ->get();
    }

    public static function maxCreateAt($identification)
    {
        $max = DB::table('log_etl')
                ->where('identification', 'LIKE', $identification.'%')
                ->max('created_at');
        $date = implode('/',array_reverse(explode('-',substr($max,0,10))));
        $hour = substr($max,11,5);
        return "$date as $hour";
    }

    public static function insert($identification,$type,$status,$source=null,$file=null,$description=null,$numberLines=null,$qtdSelectedLines=null)
    {
        DB::table('log_etl')->insert([
            'identification'=>$identification,
            'type' => $type,
            'source' => $source,
            'file' => $file,
            'description' => $description,
            'status' => $status,
            'number_lines' => $numberLines,
            'qtd_selected_lines' => $qtdSelectedLines
        ]);
    }
}
