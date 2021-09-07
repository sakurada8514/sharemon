<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Money\ExpenseController;
use App\Http\Controllers\Api\Money\IncomeController;
use App\Http\Controllers\Api\Rooms\RoomController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/regist', [AuthController::class, "regist"]);

Route::post('/regist/invite', [AuthController::class, "inviteRegist"]);

Route::post('/login', [AuthController::class, "login"]);

Route::post('/password/reset', [AuthController::class, "sendResetPasswordMail"]);
Route::post('/password/reregist', [AuthController::class, "reregistPassword"]);

Route::get('/logout', [AuthController::class, "logout"]);

Route::get('/user', [AuthController::class, "authUser"]);

Route::get('/room', [RoomController::class, "currentRoom"]);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/room/create', [RoomController::class, "createRoom"]);
    Route::get('/room/member', [RoomController::class, "findMemberList"]);

    Route::get('/regist/url', [RoomController::class, "createInviteUrl"]);

    Route::get('/expense/category/list', [ExpenseController::class, 'getExpenseCategoryList']);
    Route::post('/expense/regist', [ExpenseController::class, 'registExpense']);

    Route::get('/income/category/list', [IncomeController::class, 'getIncomeCategoryList']);
    Route::post('/income/regist', [IncomeController::class, 'registIncome']);
});
