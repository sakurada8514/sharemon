<?php

namespace App\Models\Tables;

use App\Models\Core\BaseModel;
use Illuminate\Support\Facades\DB;

class RoomModel extends BaseModel
{
    protected $table = 'rooms';
    protected $primaryKey = 'room_id';
    protected $fillable = [
        'room_id', 'user_id', 'room_name', 'del_flg'
    ];

    public function insert(array $_data): void
    {
        $_insert = $this->_createInsertUpdateData($_data, $this->_getBaseDefaultInsertDataWithDelFlg());

        DB::table($this->table)->insert($_insert);

        return;
    }

    public function uniqueCheck(string $_userId)
    {
        $_ret = DB::table($this->table)
            ->where('user_id', $_userId)
            ->count();

        return $_ret;
    }
}
