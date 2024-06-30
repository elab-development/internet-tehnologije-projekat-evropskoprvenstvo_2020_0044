<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::resource('/grupe', 'App\Http\Controllers\GrupaController')->only(['index', 'show']);

Route::resource('/rezultati', 'App\Http\Controllers\RezutatiController')->only(['index', 'show']);

Route::resource('/drzave', 'App\Http\Controllers\DrzaveController')->only(['index', 'show']);

Route::resource('/tipovi-rezultata', 'App\Http\Controllers\TipRezultataController')->only(['index', 'show']);

Route::post('/register', 'App\Http\Controllers\UserController@register');
Route::post('/login', 'App\Http\Controllers\UserController@login');

Route::get('/tabela', 'App\Http\Controllers\RezutatiController@tabela');

Route::get('/pretraga-po-tipu/{id}', 'App\Http\Controllers\RezutatiController@pretragaPoTipuRezultata');

Route::get('/paginacija', 'App\Http\Controllers\RezutatiController@paginacija');

Route::get('/grafik', 'App\Http\Controllers\RezutatiController@grafik');

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('/grupe', 'App\Http\Controllers\GrupaController')->only(['store', 'update', 'destroy']);
    Route::resource('/rezultati', 'App\Http\Controllers\RezutatiController')->only(['store', 'update', 'destroy']);
    Route::resource('/drzave', 'App\Http\Controllers\DrzaveController')->only(['store', 'update', 'destroy']);
    Route::resource('/tipovi-rezultata', 'App\Http\Controllers\TipRezultataController')->only(['store', 'update', 'destroy']);
});
