<?php

namespace App\Services;

use App\Models\Tables\InviteAccessTokenModel;
use App\Models\Tables\RoomModel;
use App\Models\User;
use App\Services\Core\BaseService;
use Illuminate\Support\Str;

class RoomService extends BaseService
{
    private ?RoomModel $_roomModel = null;
    private ?User      $_userModel = null;
    private ?InviteAccessTokenModel $_inviteAccessTokenModel = null;

    public function __construct(RoomModel $_roomModel, User $_userModel, InviteAccessTokenModel $_inviteAccessTokenModel)
    {
        $this->_roomModel = $_roomModel;
        $this->_userModel = $_userModel;
        $this->_inviteAccessTokenModel = $_inviteAccessTokenModel;
    }

    public function createRoom(array $_data, string $_userId): void
    {
        $this->_roomModel->virtualMethodTransaction('insert', [$_data, $_userId]);

        return;
    }

    public function findDetailByRoomId(string $_roomId): array
    {
        return $this->_roomModel->findByRoomId($_roomId);
    }

    public function createInvite(string $_inviteRoomId): string
    {
        $_insertData = [
            'invite_id'        => $_inviteRoomId,
            'token'            => Str::random(32),
            'token_limit_date' => date("Y-m-d H:i:s", strtotime("+30 minute"))
        ];

        $this->_inviteAccessTokenModel->insert($_insertData);

        return env('FRONT_APP_URL') . '/invite/regist?invitee=' . $_inviteRoomId . '&token=' . $_insertData['token'];
        // return URL::temporarySignedRoute('regist.invite', now()->addMinutes(30), ['invitee' => $_userId]);
    }

    public function findMemberList(string $_roomId): array
    {
        return $this->_userModel->findListByRoomId($_roomId);
    }
}
