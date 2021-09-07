<?php

namespace App\Http\Requests\Auth;

use App\Rules\Auth\ResetPasswordRule;
use Illuminate\Foundation\Http\FormRequest;

class ReregistPasswordRequest extends FormRequest
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
            'password' => ['required', 'min:8', 'confirmed'],
            'token'    => ['required', 'string']
        ];
    }
}
