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

    public function findListByRoomId(string $_roomId, string $_userId, Carbon $_date, int $_sort)
    {
        $_query = DB::table("$this->table as i")
            ->where('i.room_id', $_roomId)
            ->where(function ($query) use ($_date) {
                $query->where(function ($query) use ($_date) {
                    $query->whereYear('i.regist_date', $_date->format('Y'))
                        ->whereMonth('i.regist_date', $_date->format('m'));
                })->orWhere('i.repetition_flg', config('Const.webDB.EXPENSES.REPETITION_FLG.ON'));
            })
            ->where('i.del_flg', config('Const.webDB.DEL_FLG.OFF'))
            ->join('income_categories as ic', 'i.category_id', '=', 'ic.category_id')
            ->leftJoin('income_already_read_users as ru', function ($join) use ($_userId) {
                $join->on('i.id', '=', 'ru.income_id')
                    ->where('ru.user_id', '=', $_userId);
            })
            ->select('i.id', 'i.income', 'i.regist_date', 'i.repetition_flg', 'ic.category_name', 'ru.id as read_flg');

        $_query = $this->_addSortQuery($_query, $_sort);

        $_ret = $_query->paginate(30);

        return $this->_convertArray($_ret);
    }

    public function findTotalOfThisMonth(string $_roomId)
    {
        return DB::table($this->table)
            ->whereYear('regist_date', now()->format('Y'))
            ->whereMonth('regist_date', now()->format('m'))
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
