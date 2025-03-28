<?php

namespace App\Interfaces;

/**
 * Interface que padroniza a baixa dos lotes
 * para que todos possam ser executados em um único job
 * evitando possíveis conflitos
 */
Interface BatchProcessReturn
{
    /**
     * Load data do arquivo no banco
     * @param $returnFileName Arquivo que será carregado no banco
     */
    public function loadData($returnFileName);

    /**
     * Executa todas as etapas do processo de baixa
     */
    public function executeProcess();

    /**
     * Baixar registros cruzando com arquivo de retorno
     */
    public function updateRegisters();
}