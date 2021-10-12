<?php

namespace App\Models\Tables;

use App\Models\Core\BaseModel;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\DB;

class S3ImageModel extends BaseModel
{
    protected $table = 's3_images';
    protected $fillable = [
        'expense_id', 'img_url', 'del_flg'
    ];

    public function insert(string $_imgUrl): int
    {
        $_insert = $this->_createInsertUpdateData(['img_url' => $_imgUrl], $this->_getBaseDefaultInsertDataWithDelFlg());
        return DB::table($this->table)->insertGetId($_insert);
    }
}
