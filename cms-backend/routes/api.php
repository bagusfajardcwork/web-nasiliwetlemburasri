
<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// AUTHENCTICATION
Route::prefix('v1/auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

// USER
Route::prefix('v1')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::get('/users', [UserController::class, 'index'])
            ->middleware('permission:users.read');

        Route::post('/users', [UserController::class, 'store'])
            ->middleware('permission:users.create');

        Route::put('/users/{id}', [UserController::class, 'update'])
            ->middleware('permission:users.update');

        Route::delete('/users/{id}', [UserController::class, 'destroy'])
            ->middleware('permission:users.delete');
    });


    

// Route bawaan Laravel, sementara tetap dipertahankan.
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
