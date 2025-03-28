<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware' => ['web','auth'], 'prefix' => 'home', 'namespace' => '\Modules\Home\Http\Controllers'], function(){
    Route::get('/', 'HomeController@index')->name('home');
    Route::get('/batchpaneljson', 'HomeController@batchPanelJson')->name('batch_panel_json');
});


// Route::prefix('home')->group(function() {
//     Route::get('/', 'HomeController@index');
// });
