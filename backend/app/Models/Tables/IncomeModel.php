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
}
