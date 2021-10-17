<?php

namespace App\Http\Requests\Budget;

use App\Rules\BudgetCategoryExistsRule;
use Illuminate\Foundation\Http\FormRequest;

class RegistBudgetRequest extends FormRequest
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
            'budget' => ['required', 'integer'],
            'category_id' => ['required', new BudgetCategoryExistsRule],
        ];
    }
}
