<?php

namespace App\Models\Tables;

use App\Models\Core\BaseModel;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\DB;

class IncomeModel extends BaseModel
{
    protected $table = 'incomes';

    protected $fillable = [
        'user_id', 'room_id', 'category_id', 'income', 'comment', 'repetition_flg', 'regist_date', 'del_flg'
    ];

    public function insert(array $_registData, Authenticatable $_user): void
    {
        $_insert = $this->_createInsertUpdateData($this->_addUserData($_registData, $_user), $this->_getBaseDefaultInsertDataWithDelFlg());

        DB::table($this->table)->insert($_insert);

        return;
    }
}
