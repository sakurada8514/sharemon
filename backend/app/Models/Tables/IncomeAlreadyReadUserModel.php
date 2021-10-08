<?php

namespace App\Models\Tables;

use App\Models\Core\BaseModel;
use Illuminate\Support\Facades\DB;

class IncomeAlreadyReadUserModel extends BaseModel
{
    protected $table = 'income_already_read_users';

    public function insert(array $_data)
    {
        $_insert = $this->_createInsertUpdateData($_data, $this->_getBaseDefaultInsertData());

        DB::table($this->table)->insert($_insert);
    }

    public function exists(int $_incomeId, int $_userId)
    {
        return DB::table($this->table)
            ->where([
                ['income_id', $_incomeId],
                ['user_id', $_userId]
            ])->exists();
    }
}
