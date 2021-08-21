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
        'user_id', 'room_id', 'category_id', 'expense', 'comment', 'repetition_flg', 'regist_date', 'del_flg'
    ];

    private ?S3ImageModel $_s3ImageModel = null;

    public function __construct(S3ImageModel $_s3ImageModel)
    {
        $this->_s3ImageModel = $_s3ImageModel;
    }

    public function insert(array $_registData, string $_s3ImgUrl, Authenticatable $_user): void
    {
        $_insert = $this->_createInsertUpdateData($this->_addUserData($_registData, $_user), $this->_getBaseDefaultInsertDataWithDelFlg());

        DB::table($this->table)->insert($_insert);

        $_insertExpenseId = DB::getPdo()->lastInsertId();

        $this->_s3ImageModel->insert($_s3ImgUrl, $_user, $_insertExpenseId);

        return;
    }
}
