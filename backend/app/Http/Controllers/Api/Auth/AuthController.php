<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\InviteRegistRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegistRequest;
use App\Http\Requests\Auth\ReregistPasswordRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Services\AuthService;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    use SendsPasswordResetEmails;

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
     * 招待新規登録 招待登録改修の必要性有
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

    public function sendResetPasswordMail(ResetPasswordRequest $request): JsonResponse
    {
        $_response = $this->broker()->sendResetLink(
            $this->credentials($request)
        );

        return $_response == Password::RESET_LINK_SENT
            ? response()->json([])
            : response()->json([], Response::HTTP_UNAUTHORIZED);
    }

    public function reregistPassword(ReregistPasswordRequest $request): JsonResponse
    {
        $_data = $request->only('email', 'password', 'token');

        $resetPasswordStatus = $this->_authService->reregistPassword($_data);

        if ($resetPasswordStatus == Password::INVALID_TOKEN) {
            return response()->json([
                'errors' => config('Const.webApp.ERROR_MESSAGE.RESET_PASSWORD')
            ], Response::HTTP_UNAUTHORIZED); // トークンが異なる場合の処理追加
        }

        return response()->json([]);
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
                    'errors' => config('Const.webApp.ERROR_MESSAGE.AUTH')
                ],
                Response::HTTP_UNAUTHORIZED
            );
        }

        $_user = json_decode(json_encode($_user), true);
        // return response()->json(['user' => $_user]);
        return $this->jsonResponse($_user, 'Auth.AuthUser');
    }
}
