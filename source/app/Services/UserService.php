<?php

namespace App\Services;

use App\Models\User;
use App\Services\Core\BaseService;

class UserService extends BaseService
{
    private ?User $_userModel = null;

    public function __construct(User $_userModel)
    {
        $this->_userModel = $_userModel;
    }

    public function findDetailByUserId(string $_userId)
    {
        return $this->_userModel->findInfoByUserId($_userId);
    }

    // public function findRoomId(string $_userId)
    // {
    //     $_userData = $this->_userModel->findInfoByUserId($_userId);

    //     return $_userData['room_id'];
    // }
}
