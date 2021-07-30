<?php

namespace App\Http\Controllers\Api\Rooms;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomCreateRequest;
use App\Models\User;
use App\Services\RoomService;
use App\Services\UserService;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    private ?RoomService $_roomService = null;
    private ?UserService $_userService = null;

    public function __construct(RoomService $_roomService, UserService $_userService)
    {
        $this->_roomService = $_roomService;
        $this->_userService = $_userService;
    }

    public function createRoom(RoomCreateRequest $request)
    {
        $_data = ['room_name' => $request->room_name];

        $_userId = Auth::id();

        $this->_roomService->createRoom($_data, $_userId);

        $_user = $this->_userService->findDetailByUserId($_userId);

        return response()->json(['user' => $_user]);
    }

    public function createUrl()
    {
        $_userId = Auth::id();

        $_url = $this->_roomService->createUrl($_userId);

        return response()->json(['url' => $_url]);
    }
}
