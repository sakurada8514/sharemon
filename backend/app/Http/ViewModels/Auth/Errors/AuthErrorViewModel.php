<?php

namespace App\Http\ViewModels\Auth\Errors;

use App\Http\ViewModels\Core\ViewModel;

class AuthErrorViewModel implements ViewModel
{
    public function apply(array $data): array
    {
        return [
            'errors' => ['auth' => 'メールアドレスまたはパスワードが間違えています。']
        ];
    }
}
