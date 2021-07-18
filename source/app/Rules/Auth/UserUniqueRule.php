<?php

namespace App\Rules\Auth;

use App\Models\User;
use App\Services\AuthService;
use Illuminate\Contracts\Validation\Rule;

class UserUniqueRule implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value): bool
    {
        $_userModel = new User();
        return $_userModel->uniqueCheckByEmail($value) > 0 ? false : true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'このメールアドレスは既に登録されています。';
    }
}
