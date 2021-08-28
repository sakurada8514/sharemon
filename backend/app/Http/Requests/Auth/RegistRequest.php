<?php

namespace App\Http\Requests\Auth;

use App\Rules\Auth\UserUniqueRule;
use Illuminate\Foundation\Http\FormRequest;

class RegistRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "email"    => ["required", "email", new UserUniqueRule],
            "password" => ["required", "min:8", "confirmed"],
            "name"     => ["required"]
        ];
    }
}
