<?php

namespace App\Http\Controllers\SPA;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class PdfController extends Controller
{
    public function download()
    {
        return Storage::disk( 'pdf' )->download( 'Lorem Ipsum.pdf' );
    }
}