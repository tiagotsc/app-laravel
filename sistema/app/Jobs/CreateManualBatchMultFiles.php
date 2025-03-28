<?php

namespace App\Jobs;

use App\Classes\SO;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

/**
 * Job padrão usado para gerar lote manual em servidor linux remoto
 * Usando apenas multiplos arquivos
 */
class CreateManualBatchMultFiles implements ShouldQueue
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
        private $files, # Arquivos local
        private $command, # Comando que será executado no servidor linux
        private $username # Matrícula do usuário iniciou processo
    )
    {
        $this->SO = new SO($this->linuxServer, $linuxUser);
    }

    /**
     * Array com dados de gravação do log
     */
    private function dataLog($file, $description, $status)
    {
        return [
            'identification' =>$this->identifyProcess,
            'type' => 'EXTRACT',
            'source' => 'Predator',
            'file' => $file,
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
        $this->SO->SCPsendManyFiles($this->localDir, $this->remoteDir);
        foreach($this->files as $idFile => $fileName){
            $scp = $this->SO->SCPcheckOneFile($this->remoteDir, $fileName);
            if($scp){
                DB::table('log_etl')->insert($this->dataLog($fileName, 'SCP com sucesso! Executado por: '.$this->username,'OK'));
                Storage::delete("public/temp/".basename($this->localDir).'/'.$fileName);
            }else{
                DB::table('log_etl')->insert($this->dataLog($fileName, 'ERRO no SCP! Executado por: '.$this->username,'ERROR'));
            }
        }
        DB::table('log_etl')->insert($this->dataLog('Order|Detail|Supplier', 'Executando comando remoto','OK'));
        $this->SO->execRemoteCommand($this->command);
    }
}
