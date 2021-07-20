<?php

namespace App\Services;

use App\Models\Tables\RoomModel;
use App\Services\Core\BaseService;

class RoomService extends BaseService
{
    private ?RoomModel $_roomModel = null;

    public function __construct(RoomModel $_roomModel)
    {
        $this->_roomModel = $_roomModel;
    }

    public function createRoom(array $_data)
    {
        $this->_roomModel->insert($_data);
    }
}
