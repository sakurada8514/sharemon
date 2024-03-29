<?php

namespace App\Models\Core;

use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\User as Authenticatable;

class UserBaseModel extends Authenticatable
{

    private int $_attempts = 1;

    protected function _convertArray($_data): array
    {
        if (is_null($_data)) {
            return [];
        }
        return json_decode(json_encode($_data), true);
    }

    protected function _createInsertUpdateData(array $_insert, array $_addData): array
    {
        array_walk_recursive($_addData, function ($_val, $_key) use (&$_insert) {
            if (!array_key_exists($_key, $_insert)) {
                $_insert[$_key] = $_val;
            }
        });
        return $_insert;
    }


    protected function _getBaseDefaultInsertData(): array
    {
        return [
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
    protected function _getBaseDefaultUpdateData(): array
    {
        return [
            'updated_at' => now()
        ];
    }

    protected function _getBaseDefaultInsertDataWithDelFlg(): array
    {
        return [
            'del_flg' => config('Const.webDB.DEL_FLG.OFF'),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }

    protected function setAttempts(int $_num): void
    {
        $this->_attempts = $_num;
    }

    public function virtualMethodTransaction(string $_methodName, array $_args = []): mixed
    {
        return DB::transaction(function () use ($_methodName, $_args) {
            return call_user_func_array([$this, $_methodName], $_args);
        }, $this->_attempts);
    }
}
