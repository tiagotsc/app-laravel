<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

/**
 * Classe para envio de email padrão
 */
class SendDefault extends Mailable
{
    use Queueable, SerializesModels;

    public $details;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($details = [])
    {
        if(!$details){
            $message = "Informe os detalhes do email como: Título, texto e anexo, se disponível!\n";
            $message .= "Obrigatóriamento details precisar ter title e body e opcionalmente files\n";
            $message .= "\$details['title' => 'Título email', 'body' => 'Conteúdo email', 'files' => ['file1.txt','file2.txt']]";
            echo $message;
            throw new \Exception($message);
        }
        $this->details = $details;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $this->subject($this->details['title'])
                    ->view('layouts.mail.default');
        if(isset($this->details['files'])){
            foreach ($this->details['files'] as $file){
                $this->attach($file);
            }
        }
    
        return $this;
    }
}
