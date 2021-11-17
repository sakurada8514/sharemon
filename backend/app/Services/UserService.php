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

    public function findDetailByUserId(string $_userId): array
    {
        return $this->_userModel->findInfoByUserId($_userId);
    }

    public function findProfile(string $_userId)
    {
        return $this->_userModel->findProfile($_userId);
    }

    public function editProfile(array $_editData, ?string $_s3ImgUrl)
    {
        $this->_userModel->virtualMethodTransaction('updateData', [$_editData, $_s3ImgUrl]);

        return;
    }

    // public function findRoomId(string $_userId)
    // {
    //     $_userData = $this->_userModel->findInfoByUserId($_userId);

    //     return $_userData['room_id'];
    // }
}
