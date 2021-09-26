<?php

namespace App\Models\Tables;

use App\Models\Core\BaseModel;
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

    public function findListByRoomId(string $_roomId)
    {
        $_ret = DB::table("$this->table as e")
            ->where('e.room_id', $_roomId)
            ->where(function ($query) {
                $query->where(function ($query) {
                    $query->whereYear('e.regist_date', now()->format('Y'))
                        ->whereMonth('e.regist_date', now()->format('m'));
                })->orWhere('e.repetition_flg', config('Const.webDB.EXPENSES.REPETITION_FLG.ON'));
            })
            ->where('e.del_flg', config('Const.webDB.DEL_FLG.OFF'))
            ->join('expense_categories as ec', 'e.category_id', '=', 'ec.category_id')
            ->orderByDesc('regist_date')
            ->select('e.expense', 'e.regist_date', 'ec.category_name')
            ->paginate(20);

        return $this->_convertArray($_ret);
    }

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
