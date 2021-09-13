<?php

namespace App\Services;

use App\Models\Tables\InviteAccessTokenModel;
use App\Services\Core\BaseService;

class InviteAccessTokenService extends BaseService
{
    private ?InviteAccessTokenModel $_inviteAccessTokenModel = null;

    public function __construct(InviteAccessTokenModel $_inviteAccessTokenModel)
    {
        $this->_inviteAccessTokenModel = $_inviteAccessTokenModel;
    }
    public function existsToken(string $_token): bool
    {
        return $this->_inviteAccessTokenModel->coustBytoken($_token) > 0;
    }
}
