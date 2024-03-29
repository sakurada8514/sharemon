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

    public function setDirName(): object
    {
        $_callClassName = debug_backtrace()[1]['class'];
        $_user = Auth::user();
        switch ($_callClassName) {
            case config('Const.s3Service.S3_CALL_CLASS.expense'):
                $this->_dirName .= $_user->room_id . '/expense';
                break;
            case config('Const.s3Service.S3_CALL_CLASS.profileIcon'):
                $this->_dirName .= $_user->room_id . '/profileIcon/' . $_user->id;
                break;
            default:
                break;
        }

        return $this;
    }

    public function upload($_img): ?string
    {
        if (is_null($_img)) {
            return null;
        }

        $_path = Storage::disk('s3')->put($this->_dirName, $_img, $this->_access);

        return Storage::disk('s3')->url($_path);
    }
}
