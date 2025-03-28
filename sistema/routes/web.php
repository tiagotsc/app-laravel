<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

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

Route::get('/', function () {
    if(Auth::id()){
        #return view('home');
        return redirect()->route('home');
    }else{
        return view('auth.login');
    }
    
});

// Route::get('/home', function () {
//     return view('home');
//     #return redirect()->route('dash_volumetry.index');
// })->middleware(['auth'])->name('home');

Route::group(['middleware' => 'auth'], function(){

    # USER
    Route::put('/user/{id}/update/password', 'UserController@updatePassword')->name('user.update_password');
    Route::resource('/users', 'UserController')->middleware('can:users.manager');
    Route::get('user/datajson/{id?}', 'UserController@dataJson')->name('user.datajson')->middleware('can:users.manager');
    Route::get('user/alldatajson', 'UserController@allDataJson')->name('user.alldatajson')->middleware('can:users.manager');

    # PERMISSION
    Route::resource('/permissions', 'PermissionController')->middleware('can:permissions.manager');
    Route::get('permission/datajson/{id?}', 'PermissionController@dataJson')->name('permission.datajson')->middleware('can:permissions.manager');
    Route::get('permission/alldatajson', 'PermissionController@allDataJson')->name('permission.alldatajson')->middleware('can:permissions.manager');

    # ROLE
    #Route::resource('/roles', 'RoleController')->middleware('can:roles.manager');
    Route::get('roles', 'RoleController@index')->name('roles.index')->middleware('can:roles.manager');
    Route::get('roles/create', 'RoleController@create')->name('roles.create')->middleware('can:roles.manager');
    Route::get('roles/{roles}', 'RoleController@show')->name('roles.show')->middleware('can:roles.manager');
    Route::get('roles/{roles}/edit', 'RoleController@edit')->name('roles.edit')->middleware('can:roles.manager');
    Route::post('roles', 'RoleController@store')->name('roles.store')->middleware('can:roles.manager');
    Route::put('roles/{roles}', 'RoleController@update')->name('roles.update')->middleware('can:roles.manager');
    Route::delete('roles/{roles}', 'RoleController@destroy')->name('roles.destroy')->middleware('can:roles.manager');
    Route::get('role/datajson/{id?}', 'RoleController@dataJson')->name('role.datajson')->middleware('can:roles.manager');
    Route::get('role/alldatajson', 'RoleController@allDataJson')->name('role.alldatajson')->middleware('can:roles.manager');
});

require __DIR__.'/auth.php';
