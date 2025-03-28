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
use \App\Classes\Csv;
use Illuminate\Support\Facades\Storage;

/**
 * Job padrão usado para exportar lote e enviar por email, tudo em segundo plano
 */
class ExportBatch implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $batch; # Objeto do lote
    public $title; # Título do processo e email
    public $to; # Quem receberá o email
    public $details = []; # Todos os detalhes do envio de email com: title, body e opcionalmente array files
    public $downloadFile = false; # Se definido como TRUE, anexa o arquivo modelo de baixa

    /**
     * Create a new job instance.
     * @param $batch Objeto do lote
     * @param $title Título do email
     * @param $email Quem receberá o email
     * @return void
     */
    public function __construct($batch, $title, $to, $downloadFile = false)
    {
        if(!in_array('content',get_class_methods($batch))){
            $msg = 'Error! O model obrigatóriamente precisar ter o método de relacionamento do conteúdo do lote: public function content()';
            echo $msg;
            throw new \Exception($msg);
        }
        $this->batch = $batch;
        $this->title = $title;
        $this->to = $to;
        $this->downloadFile = $downloadFile;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $content = $this->batch->content->toArray();
        $nameFile = str_replace('.csv','_'.time().'.csv',$this->batch->name);
        $csv = new Csv($nameFile);
        $csv->feed($content);
        #$csv->save('storage/temp/');
        $this->details['title'] = $this->title.' - Lote '.substr($this->batch->created_at,0,8);
        $this->details['body'] = 'Segue em anexo.';
        $this->details['files'] = [];
        if(Storage::disk('local')->put("public/temp/{$nameFile}", $csv->getBufferFile())){
            $this->details['files'][] = public_path("storage/temp/{$nameFile}");
            #$this->details['files'][] = asset("storage/temp/{$nameFile}");
        }

        # Se anexo de arquivo de baixa estiver habilitado
        if($this->downloadFile == true){ 
            $downloadFileContent = $this->batch->dowloadFilecontent->toArray();
            $nameDownloadFile = 'arquivo_baixa_'.time().'.csv';
            $csvDFile = new Csv($nameDownloadFile);
            $csvDFile->feed($downloadFileContent);
            if(Storage::disk('local')->put("public/temp/{$nameDownloadFile}", $csvDFile->getBufferFile())){
                $this->details['files'][] = public_path("storage/temp/{$nameDownloadFile}");
                #$this->details['files'][] = asset("storage/temp/{$nameFile}");
            }
        }

        Mail::to($this->to)->send(new SendDefault($this->details));
        foreach ($this->details['files'] as $file){
            Storage::delete("public/temp/".basename($file));
        }
    }
}
