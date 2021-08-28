<?php

use App\Http\Controllers\InviteController;
use App\Http\Controllers\PasswordController;
use Illuminate\Support\Facades\Route;

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

Route::get('/redis_test', function () {
    return session()->all();
});

// 専用登録ページへ飛ばす？登録フォームはリアクトで作るかどうか
Route::get('/regist/invite', [InviteController::class, "inviteRegistIndex"])->name("regist.invite");

Route::get('/password/reset/form', [PasswordController::class, "resetFormIndex"])->name("password.reset");

Route::get('{any}', function () {
    return view('app');
})->where('any', '.*');
