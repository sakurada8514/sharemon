<?php

namespace App\Models\Tables;

use App\Models\Core\BaseModel;
use Carbon\Carbon;
use DateTime;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\DB;

class IncomeModel extends BaseModel
{
    protected $table = 'incomes';

    protected $fillable = [
        'user_id', 'room_id', 'category_id', 'income', 'comment', 'repetition_flg', 'regist_date', 'del_flg'
    ];

    public function findListByRoomId(string $_roomId, string $_userId, array $_option)
    {
        $_query = DB::table("$this->table as i")
            ->where('i.room_id', $_roomId)
            ->where(function ($query) use ($_option) {
                $query->where(function ($query) use ($_option) {
                    $query->whereYear('i.regist_date', $_option['date']->format('Y'))
                        ->whereMonth('i.regist_date', $_option['date']->format('m'));
                })->orWhere(function ($query) use ($_option) {
                    $query->where('i.repetition_flg', config('Const.webDB.EXPENSES.REPETITION_FLG.ON'))
                        ->where('i.regist_date', '<', $_option['date']);
                });
            })
            ->where('i.del_flg', config('Const.webDB.DEL_FLG.OFF'))
            ->join('income_categories as ic', 'i.category_id', '=', 'ic.category_id')
            ->leftJoin('income_already_read_users as ru', function ($join) use ($_userId) {
                $join->on('i.id', '=', 'ru.income_id')
                    ->where('ru.user_id', '=', $_userId);
            })
            ->select('i.id', 'i.income', 'i.regist_date', 'i.repetition_flg', 'ic.category_name', 'ru.id as read_flg');

        $_query = $this->_addSortQuery($_query, $_option['sort']);

        $_ret = $_query->paginate(30);

        return $this->_convertArray($_ret);
    }

    public function findByIncomeId(int $_incomeId)
    {
        $_ret = DB::table("$this->table as i")
            ->join('users as u', 'i.user_id', 'u.id')
            ->join('income_categories as ic', 'i.category_id', 'ic.category_id')
            ->where('i.id', $_incomeId)
            ->select(
                'i.id',
                'i.income',
                'comment',
                'i.regist_date',
                'i.repetition_flg',
                'u.name',
                'ic.category_name',
            )
            ->first();

        return $this->_convertArray($_ret);
    }

    public function findTotalOfThisMonth(string $_roomId)
    {
        return DB::table($this->table)
            ->where(function ($query) {
                $query->where(function ($query) {
                    $query->whereYear('regist_date', now()->format('Y'))
                        ->whereMonth('regist_date', now()->format('m'));
                })->orWhere(function ($query) {
                    $query->where('repetition_flg', config('Const.webDB.EXPENSES.REPETITION_FLG.ON'))
                        ->where('regist_date', '<', now());
                });
            })
            ->where([
                ['room_id', $_roomId],
                ['del_flg', config('Const.webDB.DEL_FLG.OFF')]
            ])
            ->selectRaw('sum(income) as total,count(income) as count')
            ->first();
    }

    public function findIncomeDaily(string $_roomId, Carbon $_date)
    {
        $_query = DB::table($this->table)
            ->where([
                ['room_id', $_roomId],
                ['del_flg', config('Const.webDB.DEL_FLG.OFF')]
            ])
            ->orderBy('regist_date')
            ->groupBy('regist_date')
            ->selectRaw('sum(income) as daily_total , regist_date');

        $_ret = $_query->whereYear('regist_date', $_date->format('Y'))
            ->whereMonth('regist_date', $_date->format('m'))->get();

        return $this->_convertArray($_ret);
    }

    public function insert(array $_registData, Authenticatable $_user): void
    {
        $_insert = $this->_createInsertUpdateData($this->_addUserData($_registData, $_user), $this->_getBaseDefaultInsertDataWithDelFlg());

        DB::table($this->table)->insert($_insert);

        return;
    }

    public function updateData(array $_date)
    {
        $_update = $this->_createInsertUpdateData($_date, $this->_getBaseDefaultUpdateData());
        DB::table($this->table)->where('id', $_date['id'])->update($_update);
    }

    private function _addSortQuery(object $_query, int $_sort)
    {
        switch ($_sort) {
            case config('Const.webDB.INCOME_SORT.DATE_DESC'):
                return $_query->orderByDesc('i.regist_date');

            case config('Const.webDB.INCOME_SORT.DATE_ASC'):
                return $_query->orderBy('i.regist_date');

            case config('Const.webDB.INCOME_SORT.INCOME_ASC'):
                return $_query->orderBy('i.income');

            case config('Const.webDB.INCOME_SORT.INCOME_DESC'):
                return $_query->orderByDesc('i.income');
        }
    }
}
