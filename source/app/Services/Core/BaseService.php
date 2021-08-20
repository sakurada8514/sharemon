<?php

namespace App\Services\Core;

use Illuminate\Contracts\Auth\Authenticatable;

abstract class BaseService
{
    //共通関数記述
    protected function _doConvertDate(string $_date, string $_format = 'Y-m-d H:i:s')
    {
        return date($_format, strtotime($_date));
    }
}
