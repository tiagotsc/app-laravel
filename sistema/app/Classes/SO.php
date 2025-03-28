<?php

namespace App\Classes;

/**
 * Classe responsável pela execuções via linha de comando tanto no Windows quanto Linux
 */
class SO
{
    private string $SO; # Armazena identificação SO
    public function __construct(
        public string $linuxServer,
        public string  $linuxUser
    )
    {
        $this->SO = strtoupper(substr(PHP_OS, 0, 3));
    }

    // SCP - Envia um arquivo
    public function SCPsendOneFile($localDir, $remoteDir, $file)
    {
        // SO - Windows
        if ($this->SO === 'WIN'){
            return (bool) shell_exec('copy '.$localDir.$file.' '.$remoteDir);
        }else{ // SO - Linux
            // Remove arquivo existente lá
            shell_exec('ssh '.$this->linuxUser.'@'.$this->linuxServer.' "rm -f '.$remoteDir.$file.'"');
            # SCP - Envio o arquivo para lá
            shell_exec('scp '.$localDir.$file.' '.$this->linuxUser.'@'.$this->linuxServer.':'.$remoteDir);
            return $this->SCPcheckOneFile($remoteDir, $file);
            #return true;
        }  
    }

    // SCP - Checa se enviou um arquivo com sucesso
    public function SCPcheckOneFile($remoteDir, $file)
    {
        // SO - Windows
        if ($this->SO === 'WIN'){
            $check = shell_exec('dir '.$remoteDir.env('SO_SEP').$file.'* /b');
            if(trim($check) == $file){
                return true;
            }
            return false; 
        }else{// SO - Linux
            $status = false;
            // Verifica se SCP ocorreu com sucesso           
            $checkSCP = shell_exec('ssh '.$this->linuxUser.'@'.$this->linuxServer.' "cd '.$remoteDir.' && ls | grep '.$file.'"');
            #print_r(trim($checkSCP));
            if(trim($checkSCP) == $file){ // Se arquivo foi copiado com sucesso
                // Concede permissão
                shell_exec('ssh '.$this->linuxUser.'@'.$this->linuxServer.' "chmod 777 '.$remoteDir.env('SO_SEP').$file.'"');
                $status = true;
            }
            return $status;

        }
    }

    // SSH - Executa comando remotamente
    public function execRemoteCommand($command)
    {
        // SO - Windows
        if ($this->SO === 'WIN'){
            return (bool) shell_exec($command);
        }else{ // SO - Linux
            // Executa comando remotamente
            return (bool) shell_exec('ssh '.$this->linuxUser.'@'.$this->linuxServer.' "'.$command.'"');
        }
    }

    // SCP - Envia multiplos arquivos
    public function SCPsendManyFiles($localDir, $remoteDir)
    {
        // SO - Windows
        if ($this->SO === 'WIN'){
            return (bool) shell_exec('copy '.$localDir.'* '.$remoteDir);
        }else{ // SO - Linux
            // Remove arquivos existente lá no diretório
            shell_exec('ssh '.$this->linuxUser.'@'.$this->linuxServer.' "rm -f '.$remoteDir.'*"');
            # SCP - Envio os arquivos para lá
            shell_exec('scp '.$localDir.'* '.$this->linuxUser.'@'.$this->linuxServer.':'.$remoteDir);
        } 
    }

}