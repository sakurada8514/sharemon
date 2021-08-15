<?php

namespace App\Services\Core;

use Illuminate\Contracts\Auth\Authenticatable;

abstract class BaseService
{
    //共通関数記述
    protected function _addUserData(array $_targetArray, Authenticatable $_userData)
    {
        $_targetArray['user_id'] = $_userData->id;
        $_targetArray['room_id'] = $_userData->room_id;

        return $_targetArray;
    }

    protected function _doConvertDate(string $_date, string $_format = 'Y-m-d H:i:s')
    {
        return date($_format, strtotime($_date));
    }
}
