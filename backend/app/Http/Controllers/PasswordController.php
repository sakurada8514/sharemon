<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;

class PasswordController extends Controller
{
    public function resetFormIndex(Request $request): View
    {
        if (!$request->hasValidSignature()) {
            abort(401);
        }

        return view('app');
    }
}
