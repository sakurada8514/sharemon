<?php

namespace App\Http\Controllers\Api\Rooms;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomCreateRequest;
use App\Models\User;
use App\Services\RoomService;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
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

    public function index()
    {
    }

    public function store(RoomCreateRequest $request): JsonResponse
    {
        $_data = ['room_name' => $request->room_name];

        $_userId = Auth::id();

        $this->_roomService->createRoom($_data, $_userId);

        $_user = $this->_userService->findDetailByUserId($_userId);

        return response()->json(['user' => $_user]);
    }

    public function show()
    {
    }
    public function update()
    {
    }
    public function destroy()
    {
    }


    public function createInviteUrl(): JsonResponse
    {
        $_inviteRoomId = Auth::user()->room_id;

        $_url = $this->_roomService->createInvite($_inviteRoomId);

        return response()->json(['url' => $_url]);
    }
}
