<?php

namespace App\Classes;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Style;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\RichText\RichText;
use PhpOffice\PhpSpreadsheet\Style\Color;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column;
use PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column\Rule;

class Excel
{
    private $spreadsheet; # Objeto que será responsável por montar o excel
    private $fileName; # nome do arquivo
    private $countWorkSheet = 0; # gerencia quantas abas o excel terá

    function __construct($fileName)
    {
        $this->spreadsheet = new Spreadsheet();
        // delete the default active sheet
        $this->spreadsheet->removeSheetByIndex(0);
        $this->fileName = $fileName;
    }

    /**
     * Cria worksheets
     */
    function addWorkSheets($name, $datas)
    {
        // Create a new worksheet
        $workSheet = new Worksheet($this->spreadsheet, $name);

        // Attach the "My Data" worksheet as the first worksheet in the Spreadsheet object
        $this->spreadsheet->addSheet($workSheet, $this->countWorkSheet);

        if(count($datas) > 0){ # If exists datas
            $this->feedWorksheet($datas);
            // Resize columns
            $this->resizeColumns($workSheet);
            // Add filter in columns
            $this->addFilterColumns();
        }

        // Set active sheet index to the first sheet, so Excel opens this as the first sheet
        $this->spreadsheet->setActiveSheetIndex(0);

        $this->countWorkSheet++;
    }

    /**
     * Redimensiona colunas de acordo com o conteúdo
     * @param $workSheet Aba recebida para redimensionamento
     */
    private function resizeColumns($workSheet)
    {
        // Resize column
        foreach ($workSheet->getColumnIterator() as $column){
            $workSheet->getColumnDimension($column->getColumnIndex())->setAutoSize(true);
        }
    }

    /**
     * Adiciona filtros nas colunas
     */
    private function addFilterColumns()
    {
        $this->spreadsheet->setActiveSheetIndex($this->countWorkSheet)
            ->setAutoFilter(
                $this->spreadsheet->setActiveSheetIndex($this->countWorkSheet)
                ->calculateWorksheetDimension()
            );
    }

    /**
     * Monta worksheets
     */
    private function feedWorksheet($datas)
    {
        $fields = array_keys((array)$datas[0]);
        # Alimenta colunas
        $this->feedColumns($fields);
        # Alimenta linhas
        $this->feedRows($datas, $fields);
    }

    /**
     * Cria as colunas
     */
    private function feedColumns($columns)
    {
        $countColumns = 1;
        foreach($columns as $column){
            # Estiliza a linha em negrito
            $this->spreadsheet->setActiveSheetIndex($this->countWorkSheet)->getStyle(1)->getFont()->setBold(true);
            # Cria a coluna
            $this->spreadsheet->setActiveSheetIndex($this->countWorkSheet)->setCellValueByColumnAndRow($countColumns, 1,  $column);
            # Próxima coluna
            $countColumns++;
        }
        $this->spreadsheet->setActiveSheetIndex($this->countWorkSheet)->freezePane('A2'); # Congela linha das colunas
    }

    /**
     * Cria as linhas
     */
    function feedRows($datas, $fields)
    {
        $countRow = 2;
        foreach($datas as $data){
            $countColumns = 1;
            foreach($fields as $field){
                $column = (is_array($data))? $data[$field]: $data->$field;

                $this->formatCell($countColumns, $countRow, $column);
                $countColumns++;
            }
            $countRow++;
        }
    }

    /**
     * Formata a célula de acordo com o conteúdo
     * @param $column 
     * @param $row 
     * @param $field
     */
    private function formatCell($column, $row, $field)
    {
        # Exemplos: 10/06/2015 | 10/06/15 | 2015-06-10 | 15-06-10
        if(preg_match('/^[0-9]{2,4}(-|\/)[0-9]{2}(-|\/)[0-9]{2,4}$/', trim($field))){ # Verifica se o conteúdo é uma data
            # Se for data converte a string data para o formato data do Excel
            $this->spreadsheet->getActiveSheet()->setCellValueByColumnAndRow($column, $row,  Date::PHPToExcel(trim($field))); #echo trim($field); echo '<br>'; echo $ExcelDateValue; exit();
            $this->spreadsheet->getActiveSheet()->getStyleByColumnAndRow($column, $row)->getNumberFormat()->setFormatCode('dd/mm/yyyy'); #PHPExcel_Style_NumberFormat::FORMAT_DATE_DMYSLASH
        }elseif(is_numeric(trim($field)) and strlen(trim($field)) >= 12){ # Se for um número muito grande converte pra string
            $type = DataType::TYPE_STRING;
            #$type = DataType::TYPE_NUMERIC;
            $this->spreadsheet->getActiveSheet()->getCellByColumnAndRow($column, $row)->setValueExplicit(trim($field), $type);
        }elseif(is_numeric(trim($field))){ # Converte para texto
            $this->spreadsheet->getActiveSheet()->setCellValueByColumnAndRow($column, $row, trim($field));
            $this->spreadsheet->getActiveSheet()->getStyleByColumnAndRow($column, $row)->getNumberFormat()
            ->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_TEXT);
        }elseif(strpos(trim($field), '%')){ # Tem símbolo de '%'
            $this->spreadsheet->getActiveSheet()->setCellValueByColumnAndRow($column, $row, trim($field));
            $this->spreadsheet->getActiveSheet()->getStyleByColumnAndRow($column, $row)->getNumberFormat()
            ->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_PERCENTAGE);
        }else{ # Mantem o formato padrão
            $this->spreadsheet->getActiveSheet()->setCellValueByColumnAndRow($column, $row, trim($field));
        }
    }

    /**
     * Salva o arquivo no diretório informado
     */
    function save($path = '')
    {
        // Save to file.
        $writer = new Xlsx($this->spreadsheet);
        $writer->save($path.$this->fileName); # salvar diretório
    }

    /**
     * Obtem o arquivo em buffer para que possa ser manipulado ou movido para outro local
     */
    function getBufferFile()
    {
        $writer = new Xlsx($this->spreadsheet);

        ob_start();
        $writer->save('php://output');
        $content = ob_get_contents();
        ob_end_clean();

        return $content;
    }

    /**
     * Força o download do Excel criado
     */
    function download()
    {
        // Save to file.
        $writer = new Xlsx($this->spreadsheet);
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="'. $this->fileName.'"');
        $writer->save('php://output');
    }
}