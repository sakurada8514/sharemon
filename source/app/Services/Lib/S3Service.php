<?php

namespace App\Services\Lib;

use App\Services\Core\BaseService;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class S3Service extends BaseService
{
    private $_img;
    private string $_dirName = '/room/';
    private string $_access = 'public';

    public function __construct()
    {
        $this->_user = Auth::user();
    }

    public function setImg(string $_img)
    {
        $this->_img = $_img;
        return $this;
    }

    public function setDirName()
    {
        $_callClassName = debug_backtrace()[1]['class'];
        $_user = Auth::user();
        switch ($_callClassName) {
            case config('Const.s3Service.S3_CALL_CLASS.expense'):
                $this->_dirName .= $_user->room_id . '/expense';
                break;
            default:
                break;
        }

        return $this;
    }

    public function upload($_img): string
    {
        if (is_null($_img)) {
            return null;
        }

        $_path = Storage::disk('s3')->put($this->_dirName, $_img, $this->_access);

        return Storage::disk('s3')->url($_path);
    }
}
