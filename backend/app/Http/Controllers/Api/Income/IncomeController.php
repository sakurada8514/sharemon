<?php

namespace App\Http\Controllers\Api\Income;

use App\Http\Controllers\Controller;
use App\Http\Requests\Income\RegistIncomeRequest;
use App\Services\IncomeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IncomeController extends Controller
{
    private ?IncomeService $_incomeService = null;

    public function __construct(IncomeService $_incomeService)
    {
        $this->_incomeService = $_incomeService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $_date = $request->date;
        $_sort = $request->sort;
        $_user = Auth::user();
        $_incomeList = $this->_incomeService->findListByRoomId($_user->room_id, $_user->id, $_date, $_sort);

        return $this->jsonResponse($_incomeList, 'Income.List');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param RegistIncomeRequest $request
     * @return JsonResponse
     */
    public function store(RegistIncomeRequest $request): JsonResponse
    {
        $_user = Auth::user();
        $_registData = $request->only('income', 'regist_date', 'category_id', 'comment', 'repetition_flg');

        $this->_incomeService->insertIncome($_registData, $_user);

        return response()->json([]);
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
        //
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
