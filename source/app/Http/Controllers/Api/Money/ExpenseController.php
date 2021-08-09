<?php

namespace App\Http\Controllers\Api\Money;

use App\Http\Controllers\Controller;
use App\Services\ExpenseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExpenseController extends Controller
{
    private ?ExpenseService $_expenseService = null;

    public function __construct(ExpenseService $_expenseService)
    {
        $this->_expenseService = $_expenseService;
    }
    public function getExpenseCategoryList()
    {
        // $_roomId = Auth::user()->room_id;
        $_roomId = 1;
        $_ret = $this->_expenseService->findCategoryList($_roomId);
        return response()->json($_ret);
    }
}
