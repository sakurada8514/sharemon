<?php

namespace App\Services;

use App\Models\Tables\RoomModel;
use App\Services\Core\BaseService;
use Illuminate\Support\Facades\Auth;

class RoomService extends BaseService
{
    private ?RoomModel $_roomModel = null;

    public function __construct(RoomModel $_roomModel)
    {
        $this->_roomModel = $_roomModel;
    }

    public function createRoom(array $_data, string $_userId)
    {
        // $this->_roomModel->insert($_data, $_userId);
        $this->_roomModel->virtualMethodTransaction('insert', [$_data, $_userId]);
    }

    public function findRoomInfoByUserId(string $_userId)
    {
        return $this->_roomModel->findByUserId($_userId);
    }
}
