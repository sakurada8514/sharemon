<?php

namespace App\Http\Controllers\Api\Rooms;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomCreateRequest;
use App\Services\RoomService;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    private ?RoomService $_roomService = null;

    public function __construct(RoomService $_roomService)
    {
        $this->_roomService = $_roomService;
    }

    public function roomCreate(RoomCreateRequest $request)
    {
        $_data = [
            'user_id' => Auth::id(),
            'room_name' => $request->room_name
        ];

        $this->_roomService->createRoom($_data);

        return response()->json([]);
    }
}
