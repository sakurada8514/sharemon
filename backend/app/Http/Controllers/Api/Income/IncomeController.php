<?php

namespace App\Http\Controllers\Api\Income;

use App\Http\Controllers\Controller;
use App\Http\Requests\Income\EditIncomeRequest;
use App\Http\Requests\Income\RegistIncomeRequest;
use App\Services\Income\IncomeService;
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
        $_option = $request->only('date',  'sort');
        $_user = Auth::user();
        $_incomeList = $this->_incomeService->findListByRoomId($_user->room_id, $_user->id, $_option);

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
        $_detail = $this->_incomeService->findDetail($id);
        $this->_incomeService->setReadFlg($id, Auth::id());
        return $this->jsonResponse($_detail, 'Income.Detail');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(EditIncomeRequest $request, int $id)
    {
        $_user = Auth::user();
        $_editData = $request->only('income', 'regist_date', 'category_id', 'comment', 'repetition_flg');

        $this->_incomeService->editIncome($id, $_editData, $_user);

        return response()->json([]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        $this->_incomeService->delete($id);
        return response()->json([]);
    }
}
