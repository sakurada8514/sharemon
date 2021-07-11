<?php

namespace App\Services;

use App\Services\Core\BaseService;
use Illuminate\Support\Facades\Auth;

class AuthService extends BaseService
{

    public function login(array $_loginData)
    {
        if (!Auth::attempt($_loginData)) {
            return null;
        }

        $_user = Auth::user();
        $_user->tokens()->where('name', 'token-name')->delete();
        $_token = $_user->createToken('token-name')->plainTextToken;
        return $_user;
    }
}
