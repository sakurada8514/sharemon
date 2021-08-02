<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;

class InviteController extends Controller
{
    private ?UserService $_userService = null;

    public function __construct(UserService $_userService)
    {
        $this->_userService = $_userService;
    }

    public function registByInvite(Request $request)
    {
        if (!$request->hasValidSignature()) {
            abort(401);
        }

        $_inviteeData = $this->_userService->findDetailByUserId($request->invitee);

        return view('inviteRegist')->with("inviteeData", $_inviteeData);
    }
}
