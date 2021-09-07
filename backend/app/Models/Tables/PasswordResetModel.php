<?php

namespace App\Models\Tables;

use App\Models\Core\BaseModel;
use Illuminate\Support\Facades\DB;

class PasswordResetModel extends BaseModel
{
    protected $table = 'password_resets';

    public function findEmailByToken(string $_token): array
    {
        $_ret = DB::table($this->table)
            ->where('token', $_token)
            ->select('email')
            ->first();

        return $this->_convertArray($_ret);
    }
}
