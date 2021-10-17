<?php

namespace App\Models\Tables;

use App\Models\Core\BaseModel;
use Illuminate\Support\Facades\DB;

class BudgetModel extends BaseModel
{
    protected $table = 'budgets';

    public function insert(array $_data)
    {
        $_insert = $this->_createInsertUpdateData($_data, $this->_getBaseDefaultInsertDataWithDelFlg());

        DB::table($this->table)->insert($_insert);
    }

    public function findListByRoomId(int $_roomId)
    {
        $_ret = DB::table("$this->table as b")
            ->join('expense_categories as ec', 'b.category_id', '=', 'ec.category_id')
            ->where([
                ['b.room_id', $_roomId],
                ['b.del_flg', config('Const.webDB.EXPENSES.REPETITION_FLG.OFF')]
            ])
            ->select('b.id', 'b.budget', 'ec.category_name')
            ->get();

        return $this->_convertArray($_ret);
    }

    public function existsByCategoryIdWithRoomId(int $_categoryId, int $_roomId)
    {
        return DB::table($this->table)
            ->where([
                ['category_id', $_categoryId],
                ['room_id', $_roomId]
            ])
            ->exists();
    }
}
