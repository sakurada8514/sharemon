<?php

namespace App\Http\ViewModels\Auth\Errors;

use App\Http\ViewModels\Core\ViewModel;

class ResetPasswordErrorViewModel implements ViewModel
{
    public function apply(array $data): array
    {
        return [
            'errors' => ['auth' => '権限が不正です。もう一度やり直してください。']
        ];
    }
}
