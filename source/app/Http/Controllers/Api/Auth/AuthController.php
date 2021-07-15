<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    private ?AuthService $_authService = null;

    public function __construct(AuthService $_authService)
    {
        $this->_authService = $_authService;
    }

    public function authUser(): JsonResponse
    {
        $_user = Auth::user();
        if (!$_user) {
            return response()->json([], 401);
        }

        return response()->json(['user' => $_user], 200);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $_loginData = $request->only('email', 'password');

        $_user = $this->_authService->login($_loginData);

        if (is_null($_user)) {
            return response()->json(['errors' => config('sharemonWebApp.ERROR_MESSAGE.AUTH')], 401);
        }

        return response()->json(['user' => $_user]);
    }

    public function logout(): JsonResponse
    {
        Auth::logout();
        return response()->json([], 200);
    }
}
