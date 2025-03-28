<?php

namespace App\Observers;

use Modules\StockTrade\Entities\StockTradeIndicator;
use App\Jobs\StockTradeResult;

class StockTradeIndicatorObserver
{
    /**
     * Handle the StockTradeIndicator "created" event.
     *
     * @param  Modules\StockTrade\Entities\StockTradeIndicator  $stockTradeIndicator
     * @return void
     */
    public function created(StockTradeIndicator $stockTradeIndicator)
    {
        StockTradeResult::dispatch($stockTradeIndicator);
    }

    /**
     * Handle the StockTradeIndicator "updated" event.
     *
     * @param  \App\Models\Modules\StockTrade\Entities\StockTradeIndicator  $stockTradeIndicator
     * @return void
     */
    public function updated(StockTradeIndicator $stockTradeIndicator)
    {
        //
    }

    /**
     * Handle the StockTradeIndicator "deleted" event.
     *
     * @param  \App\Models\Modules\StockTrade\Entities\StockTradeIndicator  $stockTradeIndicator
     * @return void
     */
    public function deleted(StockTradeIndicator $stockTradeIndicator)
    {
        //
    }

    /**
     * Handle the StockTradeIndicator "restored" event.
     *
     * @param  \App\Models\Modules\StockTrade\Entities\StockTradeIndicator  $stockTradeIndicator
     * @return void
     */
    public function restored(StockTradeIndicator $stockTradeIndicator)
    {
        //
    }

    /**
     * Handle the StockTradeIndicator "force deleted" event.
     *
     * @param  \App\Models\Modules\StockTrade\Entities\StockTradeIndicator  $stockTradeIndicator
     * @return void
     */
    public function forceDeleted(StockTradeIndicator $stockTradeIndicator)
    {
        //
    }
}
