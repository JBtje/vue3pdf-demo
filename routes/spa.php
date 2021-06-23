<?php

use App\Http\Controllers\SPA;
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

Route::group( [
    'guard' => 'spa',
], function() {
    // Unprotected route
    Route::post( 'pdf/download', [SPA\PdfController::class, 'download'] )->withoutMiddleware( ['spa'] );
} );
