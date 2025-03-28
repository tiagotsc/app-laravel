<?php

namespace App\Classes;

class Csv
{
    private $fileName = ''; # nome do arquivo
    private $delimiter = ';'; # delimitado
    private $enclosure = '"'; # caracter que ocupara as bordas das strings
    private $escapeChar = "\\"; # caracter de escape
    private $handle; # ponteiro arquivo
    private $datas; # conteudo que será carregado no csv
    private $columns; # coluna que montarão o cabeçalho do csv

    function __construct($fileName, $delimiter = ';', $enclosure = '"', $escapeChar = "\\")
    {
        $this->fileName = $fileName;
        $this->delimiter = $delimiter;
        $this->enclosure = $enclosure;
        $this->escapeChar = $escapeChar;
    }

    /**
     * Monta conteúdo
     */
    function feed($datas)
    {
        $fields = ($datas)? array_keys($datas[0]): [];
        $this->datas = $datas;
        $this->columns = $fields;
    }

    /**
     * Cria as colunas
     */
    private function feedColumns()
    {
        fputcsv($this->handle, (array) $this->columns, $this->delimiter, $this->enclosure, $this->escapeChar);
    }

    /**
     * Cria as linhas
     */
    function feedRows()
    {
        foreach ($this->datas as $row) {
            $content = array_map("utf8_decode", (array) $row); # Corrige problema de acentuação
            #$content = (array) $row;
            fputcsv($this->handle, (array) $content, $this->delimiter, $this->enclosure, $this->escapeChar);
        }
    }

    /**
     * Salva o arquivo no diretório informado
     */
    function save($path = '')
    {
        $this->handle = fopen("{$path}{$this->fileName}", 'w');
        $this->feedColumns();
        $this->feedRows();
        fclose($this->handle);
    }

    function download()
    {
        // force download of CSV
        // simulate file handle w/ php://output, direct to output (from http://www.php.net/manual/en/function.fputcsv.php#72428)
        // (could alternately write to memory handle & read from stream, this seems more direct)
        // headers from http://us3.php.net/manual/en/function.readfile.php
        header('Content-Description: File Transfer');
        header('Content-Type: application/csv');
        header("Content-Disposition: attachment; filename={$this->fileName}");
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');

        $this->handle = fopen('php://output', 'w');
        ob_clean(); // clean slate
        $this->feedColumns();
        $this->feedRows();
        ob_flush(); // dump buffer
        fclose($this->handle);
        #readfile ($this->fileName);
        die();	
    }

    /**
     * Obtem o arquivo em buffer para que possa ser manipulado ou movido para outro local
     */
    function getBufferFile()
    {
        ob_start();
        $this->handle = fopen('php://output', 'w');
        $this->feedColumns();
        $this->feedRows();
        fclose($this->handle);
        $content = ob_get_contents();
        ob_end_clean();
        return $content;
    }
}