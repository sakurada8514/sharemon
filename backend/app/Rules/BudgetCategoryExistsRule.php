<?php

namespace App\Rules;

use App\Models\Tables\BudgetModel;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class BudgetCategoryExistsRule implements Rule
{

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $_budgetModel = new BudgetModel();
        $_roomId = Auth::user()->room_id;
        $t = $_budgetModel->existsByCategoryIdWithRoomId($value, $_roomId);
        return !$_budgetModel->existsByCategoryIdWithRoomId($value, $_roomId);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'このカテゴリーは既に登録されています。';
    }
}
