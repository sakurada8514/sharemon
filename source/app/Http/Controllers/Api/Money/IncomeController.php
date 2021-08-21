<?php

namespace App\Http\Controllers\Api\Money;

use App\Http\Controllers\Controller;
use App\Http\Requests\Income\RegistIncomeRequest;
use App\Services\IncomeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IncomeController extends Controller
{
    private ?IncomeService $_incomeService = null;

    public function __construct(IncomeService $_incomeService)
    {
        $this->_incomeService = $_incomeService;
    }

    public function getIncomeCategoryList()
    {
        $_roomId = Auth::user()->room_id;

        $_res = $this->_incomeService->findCategoryList($_roomId);

        return response()->json(['categoryList' => $_res]);
    }

    public function registIncome(RegistIncomeRequest $request)
    {
        $_user = Auth::user();
        $_registData = $request->only('income', 'regist_date', 'category_id', 'comment', 'repetition_flg');

        $this->_incomeService->insertIncome($_registData, $_user);

        return response()->json([]);
    }
}
