<?php

namespace App\Models\Tables;

use App\Models\Core\BaseModel;
use Illuminate\Support\Facades\DB;

class IncomeCategoryModel extends BaseModel
{
    protected $table = 'income_categories';
    protected $primaryKey = 'category_id';
    protected $fillable = [
        'category_id', 'room_id', 'category_name', 'del_flg'
    ];

    public function findListByRoomId(string $_roomId)
    {
        $_ret = DB::table($this->table)
            ->where('room_id', $_roomId)
            ->orWhere('all_flg', config('Const.webDB.EXPENSE_CATEGORY.ALL_FLG.ON'))
            ->select('category_name', 'category_id')
            ->get();

        return $this->_convertArray($_ret);
    }
}
