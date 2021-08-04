<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PasswordController extends Controller
{
    public function resetFormIndex(Request $request)
    {
        if (!$request->hasValidSignature()) {
            abort(401);
        }

        return view('app');
    }
}
