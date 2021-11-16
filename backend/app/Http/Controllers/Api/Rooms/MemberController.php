<?php

namespace App\Http\Controllers\Api\Rooms;

use App\Http\Controllers\Controller;
use App\Services\Lib\S3Service;
use App\Services\RoomService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MemberController extends Controller
{
    private ?RoomService $_roomService = null;
    private ?S3Service $_s3Service = null;
    private ?UserService $_userService = null;

    public function __construct(RoomService $_roomService, S3Service $_s3Service, UserService $_userService)
    {
        $this->_roomService = $_roomService;
        $this->_s3Service = $_s3Service;
        $this->_userService = $_userService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $_roomId = Auth::user()->room_id;

        $_res = $this->_roomService->findMemberList($_roomId);

        return response()->json(['memberList' => $_res]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $_editData = $request->only('name');
        $_editData['id'] = $id;
        $_s3ImgUrl = $this->_s3Service->setDirName()->upload($request->file('icon'));
        $this->_userService->editProfile($_editData, $_s3ImgUrl);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
