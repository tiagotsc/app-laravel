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
use Illuminate\Support\Facades\Storage;
use App\Classes\Excel;
use Illuminate\Database\Eloquent\Model;

/**
 * Resultado dos lotes - Job padrão usado para exportar registros detalhado e enviar por email, tudo em segundo plano
 */
class ExportBatchDetailed implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $contentReport; # Armazena relatório
    public $fileInitials; # Iniciais do arquivo
    public $start; # Data início usado na filtragem dos registros
    public $end; # Data fim usado na filtragem dos registros
    public $title; # Título do processo e email
    public $to; # Quem receberá o email
    public $details = []; # Todos os detalhes do envio de email com: title, body e opcionalmente array files

    /**
     * Create a new job instance.
     *
     * @param $objectBatchsContent Precisa ser um objeto model que contenhada método detailsResult que retorno registros do lote
     * @param $start Data início da filtragem
     * @param $end Data fim da filtragem
     * @param $title Título do email
     * @param $to Quem recebe o email
     * 
     * @return void
     */
    public function __construct(Model $objectBatchsContent, $fileInitials, $start, $end, $title, $to)
    {
        if(!in_array('detailsResult',get_class_methods($objectBatchsContent))){
            $msg = 'Error! O model obrigatóriamente precisar ter o método estático de detalhamento do resultado: public static function detailsResult()';
            echo $msg;
            throw new \Exception($msg);
        }
        $this->contentReport = $objectBatchsContent::detailsResult($start, $end);
        $this->fileInitials = $fileInitials;
        $this->start = $start;
        $this->end = $end;
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
        $nameFile = $this->fileInitials.'_detalhado_'.$this->start.'_'.$this->end.'_'.time().'.xlsx';
        $excel  = new Excel($nameFile);
        $excel->addWorkSheets('detalhado', $this->contentReport);
        #$excel->save('storage/temp/');
        $this->details['title'] = $this->title;
        $this->details['body'] = 'Segue em anexo.';
        $this->details['files'] = [];

        if(Storage::disk('local')->put("public/temp/{$nameFile}", $excel->getBufferFile())){
            $this->details['files'][] = public_path("storage/temp/{$nameFile}");
            #$this->details['files'][] = asset("storage/temp/{$nameFile}");
        }

        Mail::to($this->to)->send(new SendDefault($this->details));
        foreach ($this->details['files'] as $file){
            Storage::delete("public/temp/".basename($file));
        }
    }
}
