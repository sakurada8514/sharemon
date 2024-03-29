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

class ExpenseAlreadyReadUserModel extends BaseModel
{
    protected $table = 'expense_already_read_users';

    public function insert(array $_data)
    {
        $_insert = $this->_createInsertUpdateData($_data, $this->_getBaseDefaultInsertData());

        DB::table($this->table)->insert($_insert);
    }

    public function exists(int $_expenseId, int $_userId)
    {
        return DB::table($this->table)
            ->where([
                ['expense_id', $_expenseId],
                ['user_id', $_userId]
            ])->exists();
    }
}
