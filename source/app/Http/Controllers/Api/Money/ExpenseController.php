<?php

namespace App\Http\Controllers\Api\Money;

use App\Http\Controllers\Controller;
use App\Http\Requests\Expense\RegistExpenseRequest;
use App\Services\ExpenseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ExpenseController extends Controller
{
    private ?ExpenseService $_expenseService = null;

    public function __construct(ExpenseService $_expenseService)
    {
        $this->_expenseService = $_expenseService;
    }

    public function getExpenseCategoryList()
    {
        $_roomId = Auth::user()->room_id;

        $_ret = $this->_expenseService->findCategoryList($_roomId);

        return response()->json($_ret);
    }

    public function registExpense(RegistExpenseRequest $request)
    {
        $_user = Auth::user();
        $_registData = $request->only('expense', 'regist_date', 'category_id', 'comment', 'repetition_flg');

        // $_img = $request->file('receipt_img');
        // $path = Storage::disk('s3')->put('/', $_img, 'public');

        $this->_expenseService->insertExpense($_registData, $_user);

        return response()->json([]);
    }
}
