<?php

namespace App\Rules;

use App\Models\Tables\RoomModel;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class CreateRoomRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value): bool
    {
        $_roomModel = new RoomModel();
        $_userId = Auth::id();
        return $_roomModel->uniqueCheck($_userId) > 0 ? false : true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The validation error message.';
    }
}
