<?php

namespace App\Models\Core;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model
{

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
}
