<?php

namespace App\Http\ViewModels\Auth;

use App\Http\ViewModels\Core\ViewModel;

class AuthUserViewModel implements ViewModel
{
    public function apply(array $data): array
    {
        return [
            'user' => [
                'name'    => $data['name'],
                'room_id' => $data['room_id']
            ]
        ];
    }
}
