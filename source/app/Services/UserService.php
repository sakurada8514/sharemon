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
        return $this->_userModel->findDetailByUserId($_userId);
    }
}
