<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\BalanceController;
use App\Http\Controllers\Api\Budget\BudgetController;
use App\Http\Controllers\Api\Expense\ExpenseCategoryController;
use App\Http\Controllers\Api\Expense\ExpenseController;
use App\Http\Controllers\Api\Income\IncomeCategoryController;
use App\Http\Controllers\Api\Income\IncomeController;
use App\Http\Controllers\Api\Rooms\MemberController;
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

/** Auth */
Route::post('/regist', [AuthController::class, "regist"]);
Route::post('/regist/invite', [AuthController::class, "inviteRegist"]);
Route::post('/login', [AuthController::class, "login"]);
Route::post('/password/reset', [AuthController::class, "sendResetPasswordMail"]);
Route::post('/password/reregist', [AuthController::class, "reregistPassword"]);
Route::post('/logout', [AuthController::class, "logout"]);
Route::get('/user', [AuthController::class, "authUser"]);

/** プライベートページ */
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('room', RoomController::class);
    Route::get('/room/invite/url', [RoomController::class, "createInviteUrl"]);

    Route::apiResource('member', MemberController::class);

    Route::apiResource('expense', ExpenseController::class);

    Route::apiResource('expensecategory', ExpenseCategoryController::class);

    Route::apiResource('income', IncomeController::class);

    Route::apiResource('incomecategory', IncomeCategoryController::class);
    Route::apiResource('budget', BudgetController::class);

    Route::get('balance/month', [BalanceController::class, 'getBalanceOfMonth']);
    Route::get('balance/daily/{date}', [BalanceController::class, 'getBalanceOfDaily']);
});
