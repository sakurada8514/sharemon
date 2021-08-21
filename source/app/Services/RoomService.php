<?php

namespace App\Services;

use App\Models\Tables\RoomModel;
use App\Services\Core\BaseService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;

class RoomService extends BaseService
{
    private ?RoomModel $_roomModel = null;

    public function __construct(RoomModel $_roomModel)
    {
        $this->_roomModel = $_roomModel;
    }

    public function createRoom(array $_data, string $_userId): void
    {
        $this->_roomModel->virtualMethodTransaction('insert', [$_data, $_userId]);

        return;
    }

    public function findRoomInfoByRoomId(string $_roomId): array
    {
        return $this->_roomModel->findInfoByUserId($_roomId);
    }

    public function createInviteUrl(string $_userId): string
    {
        return URL::temporarySignedRoute('regist.invite', now()->addMinutes(30), ['invitee' => $_userId]);
    }
}
