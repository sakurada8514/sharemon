<?php

namespace App\Models\Tables;

use App\Models\Core\BaseModel;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\DB;

class S3ImageModel extends BaseModel
{
    protected $table = 's3_images';
    protected $fillable = [
        'room_id', 'user_id', 'expense_id', 'img_url', 'del_flg'
    ];

    public function insert(string $_imgUrl, Authenticatable $_user, ?string $_expense_id = null): void
    {
        $_insert = $this->_createInsertUpdateData($this->_createS3ImgInsertData($_imgUrl, $_user, $_expense_id), $this->_getBaseDefaultInsertDataWithDelFlg());
        DB::table($this->table)->insert($_insert);
        return;
    }

    private function _createS3ImgInsertData(string $_imgUrl, Authenticatable $_user, ?string $_expense_id = null): array
    {
        return [
            'room_id' => $_user->room_id,
            'user_id' => $_user->id,
            'expense_id' => $_expense_id,
            'img_url' => $_imgUrl,
        ];
    }
}
