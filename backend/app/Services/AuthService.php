<?php

namespace App\Services;

use App\Models\Tables\PasswordResetModel;
use App\Models\User;
use App\Services\Core\BaseService;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class AuthService extends BaseService
{
    private ?User $_userModel = null;
    private ?PasswordResetModel $_passwordResetModel = null;

    public function __construct(User $_userModel, PasswordResetModel $_passwordResetModel)
    {
        $this->_userModel = $_userModel;
        $this->_passwordResetModel = $_passwordResetModel;
    }

    public function login(array $_data, bool $_remember): ?Authenticatable
    {
        $_loginData = $this->_convateLoginData($_data);

        if (!Auth::attempt($_loginData, $_remember)) {
            return null;
        }

        $_user = Auth::user();
        $_user->tokens()->where('name', $_user->name)->delete();
        $_token = $_user->createToken($_user->name)->plainTextToken;
        return $_user;
    }

    public function regist(array $_userData): void
    {
        $_userData['password'] = Hash::make($_userData['password']);

        $this->_userModel->insert($_userData);
        return;
    }

    public function reregistPassword(array $_data)
    {
        return Password::reset($_data, function ($user, $password) {
            $user->password = bcrypt($password);
            $user->save();
        });
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
