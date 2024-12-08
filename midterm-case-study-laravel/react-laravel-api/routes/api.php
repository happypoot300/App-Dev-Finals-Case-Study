<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/users', [App\Http\Controllers\Controller::class, 'getUsers']);

//product
Route::apiResource('products', App\Http\Controllers\ProductController::class);
Route::apiResource('carts', App\Http\Controllers\CartListController::class);
Route::delete('/carts/{userId}/clear', [App\Http\Controllers\CartListController::class, 'clearCart']);

Route::post('/login', [App\Http\Controllers\Auth\LoginController::class, 'apiLogin']);
Route::post('/register', [App\Http\Controllers\Auth\RegisterController::class, 'apiRegister']);

Route::post('/logout', function () {
    Auth::logout();
    return response()->json(['message' => 'Logged out successfully']);
});
