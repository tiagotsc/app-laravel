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

Route::group(['middleware' => ['web','auth'], 'prefix' => 'deploy', 'namespace' => '\Modules\Deploy\Http\Controllers'], function(){
    Route::get('/', 'DeployController@index')->name('deploy.index')->middleware('can:deploys.manager');
    #Route::get('/create', 'DeployController@create')->name('deploy.create');
    Route::post('/', 'DeployController@store')->name('deploy.store')->middleware('can:deploys.manager');
    #Route::get('/{id}', 'DeployController@show')->name('deploy.show');
    #Route::get('/{id}/edit', 'DeployController@edit')->name('deploy.edit');
    #Route::put('/{id}', 'DeployController@update')->name('deploy.update');
    #Route::delete('/{id}', 'DeployController@destroy')->name('deploy.destroy');
    Route::get('/alldatajson', 'DeployController@allDataJson')->name('deploy.alldatajson')->middleware('can:deploys.manager');
    #Route::resource('/', 'DeployController')/*->middleware('can:deploy.manager')*/;
});
