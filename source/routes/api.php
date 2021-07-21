<?php

use App\Http\Controllers\Api\Auth\AuthController;
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

Route::post('/login', [AuthController::class, "login"]);

Route::get('/logout', [AuthController::class, "logout"]);

Route::get('/user', [AuthController::class, "authUser"]);
Route::get('/room', [RoomController::class, "currentRoom"]);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/room/create', [RoomController::class, "roomCreate"]);
});
