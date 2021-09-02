<?php

namespace App\Services;

use App\Models\User;
use App\Services\Core\BaseService;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class AuthService extends BaseService
{
    private ?User $_userModel = null;

    public function __construct(User $_userModel)
    {
        $this->_userModel = $_userModel;
    }

    public function login(array $_data, bool $_remember): ?Authenticatable
    {
        $_loginData = $this->_convateLoginData($_data);

        if (!Auth::attempt($_loginData, $_remember)) {
            return null;
        }

        $_user = Auth::user();
        $_user->tokens()->where('name', 'token-name')->delete();
        $_token = $_user->createToken('token-name')->plainTextToken;
        return $_user;
    }

    public function regist(array $_userData): void
    {
        $_userData['password'] = Hash::make($_userData['password']);

        $this->_userModel->insert($_userData);
        return;
    }

    public function reregistPassword(array $_data): void
    {
        $_data['password'] = Hash::make($_data['password']);

        $this->_userModel->updateByEmail($_data);

        return;
    }

    private function _convateLoginData(array $_data): array
    {
        if (!isset($_data['name'])) {
            return $_data;
        }

        $_retData = [
            'email' => $_data['email'],
            'password' => $_data['password']
        ];
        return $_retData;
    }
}
