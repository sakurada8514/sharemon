<?php

use App\Http\Controllers\InviteController;
use Illuminate\Support\Facades\Cache;
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
Route::get('/regist/invite', [InviteController::class, "registByInvite"])->name("regist.invite");

Route::get('{any}', function () {
    return view('app');
})->where('any', '.*');
