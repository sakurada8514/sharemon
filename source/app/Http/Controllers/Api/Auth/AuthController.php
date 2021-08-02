<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\InviteRegistRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegistRequest;
use App\Services\AuthService;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    private ?AuthService $_authService = null;

    public function __construct(AuthService $_authService)
    {
        $this->_authService = $_authService;
    }

    /**
     * 新規登録
     *
     * @param RegistRequest $request
     * @return JsonResponse
     */
    public function regist(RegistRequest $request): JsonResponse
    {
        $_userData = $request->only('name', 'email', 'password');

        $this->_authService->regist($_userData);

        $_user = $this->_authService->login($_userData, false);

        return $this->_authResponse($_user);
    }

    /**
     * 招待新規登録
     *
     * @param InviteRegistRequest $request
     * @return JsonResponse
     */
    public function inviteRegist(InviteRegistRequest $request): JsonResponse
    {
        $_userData = $request->only('name', 'email', 'password', 'room_id');

        $this->_authService->regist($_userData);

        $_user = $this->_authService->login($_userData, false);

        return $this->_authResponse($_user);
    }

    /**
     * ログイン中ユーザー取得
     *
     * @return JsonResponse
     */
    public function authUser(): JsonResponse
    {
        $_user = Auth::user();

        return $this->_authResponse($_user);
    }

    /**
     * ログイン
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $_loginData = $request->only('email', 'password');
        $_remember = $request->remember;

        $_user = $this->_authService->login($_loginData, $_remember);

        return $this->_authResponse($_user);
    }

    /**
     * ログアウト
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        Auth::logout();
        return response()->json([]);
    }

    /**
     * 共通処理
     *
     * @param Authenticatable|null $_user
     * @return JsonResponse
     */
    private function _authResponse(?Authenticatable $_user): JsonResponse
    {
        if (is_null($_user)) {
            return response()->json(
                [
                    'errors' => config('sharemonWebApp.ERROR_MESSAGE.AUTH')
                ],
                Response::HTTP_UNAUTHORIZED
            );
        }

        return response()->json(['user' => $_user]);
    }
}
