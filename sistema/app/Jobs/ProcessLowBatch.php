<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use Illuminate\Support\Facades\Mail;
use App\Mail\SendDefault;

/**
 * Job padrão para baixar lotes e avisar sobre o status por email
 */
class ProcessLowBatch implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $title; # Título do processo e email
    public $to; # Quem receberá o email
    public $batchsRegisters; # Lotes / Registros
    public $details = []; # Todos os detalhes do envio de email com: title, body e opcionalmente array files

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($batchsRegisters, $title, $to)
    {
        if(!in_array('App\Interfaces\BatchProcessReturn',class_implements($batchsRegisters))){
            $msg = 'Error! Você precisar fazer uso da interface BatchProcessReturn na classe de arquivo de retorno';
            echo $msg;
            throw new \Exception($msg);
        }

        $this->batchsRegisters = $batchsRegisters;
        $this->title = $title;
        $this->to = $to;
        
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        # Baixa de fato os registros do lote
        $return = $this->batchsRegisters->executeProcess();
        $this->details['title'] = $this->title;
        $msg = '<h3>De '.$return['qtdRegFile'].' registros informados, '.$return['affected'].' foram baixados em '.$return['qtdLotes'].' lotes</h3>';
        $msg .= '<ul style="list-style: square;">';
        foreach($return['metricsStatus'] as $batchId => $metricsStatus){
            if($metricsStatus){
                $msgAux = ' ';
                $cssColor = 'blue';
            }else{
                $msgAux = ' não ';
                $cssColor = 'red';
            }
            $msg .= '<li style="color:'.$cssColor.'">Lote ID '.$batchId.' - Métricas'.$msgAux.'atualizadas</li>';
        }
        $msg .= '</ul>';
        $this->details['body'] = $msg;
        Mail::to($this->to)->send(new SendDefault($this->details));
    }
}
