<?php

namespace App\Http\Controllers\Api\Budget;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Budget\RegistBudgetRequest;
use App\Services\BudgetService;
use Illuminate\Support\Facades\Auth;

class BudgetController extends Controller
{
    private ?BudgetService $_budgetService = null;

    public function __construct(BudgetService $_budgetService)
    {
        $this->_budgetService = $_budgetService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $_roomId = Auth::user()->room_id;
        $_budgetList = $this->_budgetService->findList($_roomId);

        return response()->json(['budgetList' => $_budgetList]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RegistBudgetRequest $request)
    {
        $_user = Auth::user();
        $_registData = $request->only('budget', 'category_id');

        $this->_budgetService->insertBudget($_registData, $_user);
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
        $_detail = $this->_budgetService->findDetail($id);
        return response()->json(['detail' => $_detail]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
    {
        $_data = $request->only('category_id', 'budget');
        $this->_budgetService->editBudget($id, $_data);
        return response()->json([]);
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

    public function getBudgetTotal()
    {
        $_roomId = Auth::user()->room_id;
        $_total = $this->_budgetService->findTotal($_roomId);

        return response()->json(['total' => $_total]);
    }
}
