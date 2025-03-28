<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

use Modules\StockTrade\Entities\StockTradeIndicator;
use Modules\StockTrade\Classes\StockTradeCreateResult;
use App\Classes\Excel;

/**
 * Stock trade - Job responsável por gerar o resultado todo em segundo plano
 */
class StockTradeResult implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $indicator;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(StockTradeIndicator $indicator)
    {
        $this->indicator = $indicator;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $createResult = new StockTradeCreateResult($this->indicator);
        $status = $createResult->main(); # Gera resultado e retorna status
        /*Storage::delete("public/stock_trade_result/{$this->indicator->generate_file_name}");
        if($status){ # Se transação ocorreu bem, gera excel
            $excel  = new Excel($this->indicator->generate_file_name);
            foreach($createResult->getResultAll() as $worksheetName => $datas){
                $excel->addWorkSheets($worksheetName, $datas);
            }
            Storage::disk('local')->put("public/stock_trade_result/{$this->indicator->generate_file_name}", $excel->getBufferFile());
        }*/
    }
}
