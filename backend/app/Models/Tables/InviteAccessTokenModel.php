<?php

namespace App\Models\Tables;

use App\Models\Core\BaseModel;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\DB;

class InviteAccessTokenModel extends BaseModel
{
    protected $table = 'invite_access_tokens';
    protected $fillable = [
        'invite_id', 'token',  'token_limit_date'
    ];

    public function insert(array $_data): void
    {
        $_insert = $this->_createInsertUpdateData($_data, $this->_getBaseDefaultInsertData());

        DB::table($this->table)->insert($_insert);
        return;
    }

    public function coustBytoken(string $_inviteId, string $_token): int
    {
        return DB::table($this->table)
            ->where([
                ['invite_id', $_inviteId],
                ['token', $_token],
                ['token_limit_date', '<', now()]
            ])->count();
    }
}
