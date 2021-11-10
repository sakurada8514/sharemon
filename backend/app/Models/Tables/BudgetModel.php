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

    public function findListWithExpenseByRoomId(int $_roomId)
    {
        $_ret = DB::table("$this->table as b")
            ->join('expense_categories as ec', 'b.category_id', '=', 'ec.category_id')
            ->leftJoinSub(
                $this->_findThisMonthTotalExpenseByCategorySubQuery($_roomId),
                'e',
                'b.category_id',
                '=',
                'e.category_id'
            )
            ->where([
                ['b.room_id', $_roomId],
                ['b.del_flg', config('Const.webDB.EXPENSES.REPETITION_FLG.OFF')]
            ])
            ->select('b.id', 'b.budget', 'ec.category_name', 'e.total_expense')
            ->get();

        return $this->_convertArray($_ret);
    }

    public function findByBudgetId(int $_budgetId)
    {
        $_ret = DB::table($this->table)
            ->where('id', $_budgetId)
            ->select('budget', 'category_id')
            ->first();

        return $this->_convertArray($_ret);
    }

    public function findTotal(int $_roomId)
    {
        return DB::table($this->table)
            ->where([
                ['room_id', $_roomId],
                ['del_flg', config('Const.webDB.EXPENSES.REPETITION_FLG.OFF')]
            ])
            ->sum('budget');
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

    public function updateData(int $_budgetId, array $_data)
    {
        $_update = $this->_createInsertUpdateData($_data, $this->_getBaseDefaultUpdateData());

        DB::table($this->table)
            ->where('id', $_budgetId)
            ->update($_update);

        return;
    }

    private function _findThisMonthTotalExpenseByCategorySubQuery(int $_roomId)
    {
        return DB::table('expenses')
            ->where([
                ['room_id', $_roomId],
                ['del_flg', config('Const.webDB.EXPENSES.REPETITION_FLG.OFF')]
            ])
            ->where(function ($query) {
                $query->where(function ($query) {
                    $query->whereYear('regist_date', now()->format('Y'))
                        ->whereMonth('regist_date', now()->format('m'));
                })->orWhere(function ($query) {
                    $query->where('repetition_flg', config('Const.webDB.EXPENSES.REPETITION_FLG.ON'))
                        ->where('regist_date', '<', now());
                });
            })
            ->selectRaw('sum(expense) as total_expense,category_id')
            ->groupBy('category_id');
    }
}
