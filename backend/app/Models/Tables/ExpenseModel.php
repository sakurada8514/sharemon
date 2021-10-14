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

    public function findListByRoomId(string $_roomId, string $_userId, array $_option)
    {
        $_query = DB::table("$this->table as e")
            ->where('e.room_id', $_roomId)
            ->where(function ($query) use ($_option) {
                $query->where(function ($query) use ($_option) {
                    $query->whereYear('e.regist_date', $_option['date']->format('Y'))
                        ->whereMonth('e.regist_date', $_option['date']->format('m'));
                })->orWhere(function ($query) use ($_option) {
                    $query->where('e.repetition_flg', config('Const.webDB.EXPENSES.REPETITION_FLG.ON'))
                        ->where('e.regist_date', '<', $_option['date']);
                });
            })
            ->where('e.del_flg', config('Const.webDB.DEL_FLG.OFF'))
            ->join('expense_categories as ec', 'e.category_id', '=', 'ec.category_id')
            ->leftJoin('expense_already_read_users as ru', function ($join) use ($_userId) {
                $join->on('e.id', '=', 'ru.expense_id')
                    ->where('ru.user_id', '=', $_userId);
            })
            ->select('e.id', 'e.expense', 'e.regist_date', 'e.repetition_flg', 'ec.category_name', 'ru.id as read_flg');


        $_query = $this->_addSortQuery($_query, $_option['sort']);
        $_ret = $_query->paginate(30);

        return $this->_convertArray($_ret);
    }

    public function findByExpenseId(int $_expenseId)
    {
        $_ret = DB::table("$this->table as e")
            ->join('users as u', 'e.user_id', 'u.id')
            ->join('expense_categories as ec', 'e.category_id', 'ec.category_id')
            ->leftJoin('s3_images as si', 'e.s3_image_id', 'si.s3_image_id')
            ->where('e.id', $_expenseId)
            ->select(
                'e.id',
                'e.expense',
                'comment',
                'e.regist_date',
                'e.repetition_flg',
                'u.name',
                'ec.category_id',
                'ec.category_name',
                'si.img_url'
            )
            ->first();

        return $this->_convertArray($_ret);
    }

    public function findTotalOfThisMonth(string $_roomId)
    {
        $_ret = DB::table($this->table)
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
            ->selectRaw('sum(expense) as total,count(expense) as count')
            ->first();

        return $this->_convertArray($_ret);
    }

    public function findExpenseDaily(string $_roomId, Carbon $_date)
    {
        $_ret = DB::table($this->table)
            ->where([
                ['room_id', $_roomId],
                ['del_flg', config('Const.webDB.DEL_FLG.OFF')],
                ['repetition_flg', config('Const.webDB.EXPENSES.REPETITION_FLG.OFF')]
            ])
            ->whereYear('regist_date', $_date->format('Y'))
            ->whereMonth('regist_date', $_date->format('m'))
            ->orderBy('regist_date')
            ->groupBy('regist_date')
            ->selectRaw('sum(expense) as daily_total , regist_date')
            ->get();

        return $this->_convertArray($_ret);
    }

    public function insert(array $_registData, ?string $_s3ImgUrl = null): void
    {
        if (isset($_s3ImgUrl)) {
            $_registData['s3_image_id'] = $this->_s3ImageModel->insert($_s3ImgUrl);
        }

        $_insert = $this->_createInsertUpdateData($_registData, $this->_getBaseDefaultInsertDataWithDelFlg());

        DB::table($this->table)->insert($_insert);

        return;
    }

    public function updateData(array $_date, ?string $_s3ImgUrl = null)
    {
        if (isset($_s3ImgUrl)) {
            $_registData['s3_image_id'] = $this->_s3ImageModel->insert($_s3ImgUrl);
        }

        $_update = $this->_createInsertUpdateData($_date, $this->_getBaseDefaultUpdateData());
        DB::table($this->table)->where('id', $_date['id'])->update($_update);
    }

    private function _addSortQuery(object $_query, int $_sort)
    {
        switch ($_sort) {
            case config('Const.webDB.EXPENSE_SORT.DATE_DESC'):
                return $_query->orderByDesc('e.regist_date');

            case config('Const.webDB.EXPENSE_SORT.DATE_ASC'):
                return $_query->orderBy('e.regist_date');

            case config('Const.webDB.EXPENSE_SORT.EXPENSE_ASC'):
                return $_query->orderBy('e.expense');

            case config('Const.webDB.EXPENSE_SORT.EXPENSE_DESC'):
                return $_query->orderByDesc('e.expense');
        }
    }
}
