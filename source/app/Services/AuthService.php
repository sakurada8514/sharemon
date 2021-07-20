<?php

namespace App\Services;

use App\Models\User;
use App\Services\Core\BaseService;
use Illuminate\Support\Facades\Auth;

class AuthService extends BaseService
{
    private ?User $_userModel = null;

    public function __construct(User $_userModel)
    {
        $this->_userModel = $_userModel;
    }

    public function login(array $_data, bool $_remember)
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

    public function regist(array $_registData): void
    {
        $this->_userModel->insert($_registData);
        return;
    }

    private function _convateLoginData(array $_data)
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
