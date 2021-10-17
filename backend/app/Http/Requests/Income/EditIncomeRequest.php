<?php

namespace App\Http\Requests\Income;

use Illuminate\Foundation\Http\FormRequest;

class EditIncomeRequest extends FormRequest
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
            'id' => ['required', 'integer'],
            'income' => ['required', 'integer'],
            'regist_date' => ['required', 'date'],
            'category_id' => ['required'],
            'comment' => ['nullable', 'string'],
            'repetition_flg' => ['required'],
        ];
    }
}
