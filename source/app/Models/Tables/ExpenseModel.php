<?php

namespace App\Models\Tables;

use App\Models\Core\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ExpenseModel extends BaseModel
{
    protected $table = 'expenses';

    protected $fillable = [
        'user_id', 'room_id', 'category_id', 'expense', 'comment', 'repetition_flg', 'regist_date', 'del_flg'
    ];

    public function insert(array $_data)
    {
        $_insert = $this->_createInsertUpdateData($_data, $this->_getBaseDefaultInsertDataWithDelFlg());

        DB::table($this->table)->insert($_insert);

        return;
    }
}
