<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
#use Modules\StockTrade\Entities\StockTradeIndicator;
#use App\Observers\StockTradeIndicatorObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if (env('APP_ENV') !== 'local') { # Se ambiente for diferente de local, força HTTPS
            $this->app['request']->server->set('HTTPS','on'); // this line
            URL::forceScheme('https');
        }
        
        # Observa se houve algum cadastro de stock trade indicador
        #StockTradeIndicator::observe(StockTradeIndicatorObserver::class);
    }
}
