<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

#use Illuminate\Support\Facades\Mail;
#use App\Mail\SendDefault;
use Illuminate\Support\Facades\DB;
use \App\Classes\SO;
use Illuminate\Support\Facades\Storage;

/**
 * Job padrão usado para gerar lote manual em servidor linux remoto
 * Usando apenas um arquivo
 */
class CreateManualBatch implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $SO;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(
        private $identifyProcess, # Identificação do processo para log
        private $linuxServer, # Servidor linux que receberá arquivo ou comando
        private $linuxUser, # Usuário do servidor linux que receberá arquivo ou comando
        private $localDir, # Diretório local da aplicação
        private $remoteDir, # Diretório remoto do servidor linux
        private $file, # Arquivo local
        private $command, # Comando que será executado no servidor linux
        private $username # Matrícula do usuário iniciou processo
    )
    {
        $this->SO = new SO($this->linuxServer, $linuxUser);
    }

    /**
     * Array com dados de gravação do log
     */
    private function dataLog($description, $status)
    {
        return [
            'identification' =>$this->identifyProcess,
            'type' => 'EXTRACT',
            'source' => 'Predator',
            'file' => $this->file,
            'description' => $description,
            'status' => $status
        ];
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $scp = $this->SO->SCPsendOneFile($this->localDir, $this->remoteDir, $this->file);
        if($scp){
            DB::table('log_etl')->insert($this->dataLog('SCP com sucesso! Executado por: '.$this->username,'OK'));
            Storage::delete("public/temp/".$this->file);
            DB::table('log_etl')->insert($this->dataLog('Executando comando remoto','OK'));
            $execCommand = $this->SO->execRemoteCommand($this->command);
            // if($execCommand){
            //     DB::table('log_etl')->insert($this->dataLog('Comando remoto executado com sucesso!','OK'));
            // }else{
            //     DB::table('log_etl')->insert($this->dataLog('Erro ao executar comando remoto.','OK'));
            // }
        }else{
            DB::table('log_etl')->insert($this->dataLog('ERRO no SCP! Executado por: '.$this->username,'ERROR'));
        }
    }
}
