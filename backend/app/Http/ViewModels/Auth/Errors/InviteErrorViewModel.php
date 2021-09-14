<?php

namespace App\Http\ViewModels\Auth\Errors;

use App\Http\ViewModels\Core\ViewModel;

class InviteErrorViewModel implements ViewModel
{
    public function apply(array $data): array
    {
        return [
            'errors' => ['auth' => 'urlが無効です。もう一度やり直してください。']
        ];
    }
}
