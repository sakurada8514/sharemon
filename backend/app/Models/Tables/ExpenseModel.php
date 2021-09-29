<?php

namespace App\Models\Tables;

use App\Models\Core\BaseModel;
use Carbon\Carbon;
use DateTime;
use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ExpenseModel extends BaseModel
{
    protected $table = 'expenses';

    protected $fillable = [
        'user_id', 'room_id', 's3_image_id', 'category_id', 'expense', 'comment', 'repetition_flg', 'regist_date', 'del_flg'
    ];

    private ?S3ImageModel $_s3ImageModel = null;

    public function __construct(S3ImageModel $_s3ImageModel)
    {
        $this->_s3ImageModel = $_s3ImageModel;
    }
    // TODO::繰り返し登録関連
    public function findListByRoomId(string $_roomId, string $_userId, Carbon $_date)
    {
        $_ret = DB::table("$this->table as e")
            ->where('e.room_id', $_roomId)
            ->where(function ($query) use ($_date) {
                $query->where(function ($query) use ($_date) {
                    $query->whereYear('e.regist_date', $_date->format('Y'))
                        ->whereMonth('e.regist_date', $_date->format('m'));
                })->orWhere('e.repetition_flg', config('Const.webDB.EXPENSES.REPETITION_FLG.ON'));
            })
            ->where('e.del_flg', config('Const.webDB.DEL_FLG.OFF'))
            ->join('expense_categories as ec', 'e.category_id', '=', 'ec.category_id')
            ->leftJoin('expense_already_read_users as ru', function ($join) use ($_userId) {
                $join->on('e.id', '=', 'ru.expense_id')
                    ->where('ru.user_id', '=', $_userId);
            })
            ->orderByDesc('e.regist_date')
            ->select('e.id', 'e.expense', 'e.regist_date', 'e.repetition_flg', 'ec.category_name', 'ru.id as read_flg')
            ->paginate(20);

        return $this->_convertArray($_ret);
    }

    // TODO::繰り返し登録関連
    public function findTotalOfThisMonth(string $_roomId)
    {
        $_ret = DB::table($this->table)
            ->whereYear('regist_date', now()->format('Y'))
            ->whereMonth('regist_date', now()->format('m'))
            ->where([
                ['room_id', $_roomId],
                ['del_flg', config('Const.webDB.DEL_FLG.OFF')]
            ])
            ->selectRaw('sum(expense) as total,count(expense) as count')
            ->first();

        return $this->_convertArray($_ret);
    }

    public function findExpenseDaily(string $_roomId, Carbon $_date)
    {
        $_query = DB::table($this->table)
            ->where([
                ['room_id', $_roomId],
                ['del_flg', config('Const.webDB.DEL_FLG.OFF')]
            ])
            ->orderBy('regist_date')
            ->groupBy('regist_date')
            ->selectRaw('sum(expense) as daily_total , regist_date');

        $_ret = $_query->whereYear('regist_date', $_date->format('Y'))
            ->whereMonth('regist_date', $_date->format('m'))->get();

        return $this->_convertArray($_ret);
    }

    public function insert(array $_registData, Authenticatable $_user, ?string $_s3ImgUrl = null): void
    {
        if (isset($_s3ImgUrl)) {
            $this->_s3ImageModel->insert($_s3ImgUrl);

            $_registData['s3_image_id'] = DB::getPdo()->lastInsertId();
        }

        $_insert = $this->_createInsertUpdateData($this->_addUserData($_registData, $_user), $this->_getBaseDefaultInsertDataWithDelFlg());

        DB::table($this->table)->insert($_insert);

        return;
    }
}
