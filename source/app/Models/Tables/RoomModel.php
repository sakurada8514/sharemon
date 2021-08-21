<?php

namespace App\Models\Tables;

use App\Models\Core\BaseModel;
use Illuminate\Support\Facades\DB;

class RoomModel extends BaseModel
{
    protected $table = 'rooms';
    protected $primaryKey = 'room_id';
    protected $fillable = [
        'room_id', 'room_name', 'del_flg'
    ];

    private array $_column = [
        'room_id', 'room_name'
    ];

    public function insert(array $_data, string $_userId): void
    {
        $_insert = $this->_createInsertUpdateData($_data, $this->_getBaseDefaultInsertDataWithDelFlg());

        DB::table($this->table)
            ->insert($_insert);

        $_insertRoomId = DB::getPdo()->lastInsertId();

        DB::table('users')
            ->where('id', $_userId)
            ->update(['room_id' => $_insertRoomId]);

        return;
    }

    public function findInfoByUserId(string $_roomId): array
    {
        $_ret = DB::table($this->table)
            ->where('room_id', $_roomId)
            ->select($this->_column)
            ->first();

        return $this->_convertArray($_ret);
    }
}
