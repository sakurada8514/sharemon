<?php

namespace App\Http\Controllers\Api\Money;

use App\Http\Controllers\Controller;
use App\Http\Requests\Expense\RegistExpenseRequest;
use App\Services\ExpenseService;
use App\Services\Lib\S3Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ExpenseController extends Controller
{
    private ?ExpenseService $_expenseService = null;
    private ?S3Service      $_s3Service      = null;

    public function __construct(ExpenseService $_expenseService, S3Service $_s3Service)
    {
        $this->_expenseService = $_expenseService;
        $this->_s3Service      = $_s3Service;
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

        $_s3ImgUrl = $request->file('receipt_img');
        if ($request->file('receipt_img')) {
            $_s3ImgUrl = $this->_s3Service->setDirName()->upload($request->file('receipt_img'));
        }

        $this->_expenseService->insertExpense($_registData, $_s3ImgUrl, $_user);

        return response()->json([]);
    }
}
