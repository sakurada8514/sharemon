<?php

namespace App\Http\Controllers\Api\Expense;

use App\Http\Controllers\Controller;
use App\Http\Requests\Expense\RegistExpenseRequest;
use App\Services\Expense\ExpenseService;
use App\Services\Lib\S3Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExpenseController extends Controller
{
    private ?ExpenseService $_expenseService = null;
    private ?S3Service      $_s3Service      = null;

    public function __construct(ExpenseService $_expenseService, S3Service $_s3Service)
    {
        $this->_expenseService = $_expenseService;
        $this->_s3Service      = $_s3Service;
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
        $_expenseList = $this->_expenseService->findListByRoomId($_user->room_id, $_user->id, $_option);

        return $this->jsonResponse($_expenseList, 'Expense.List');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param RegistExpenseRequest $request
     * @return JsonResponse
     */
    public function store(RegistExpenseRequest $request): JsonResponse
    {
        $_user = Auth::user();
        $_registData = $request->only('expense', 'regist_date', 'category_id', 'comment', 'repetition_flg');

        $_s3ImgUrl = $this->_s3Service->setDirName()->upload($request->file('receipt_img'));

        $this->_expenseService->insertExpense($_registData, $_user, $_s3ImgUrl);

        return response()->json([]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        $_detail = $this->_expenseService->findDetail($id);
        $this->_expenseService->setReadFlg($id, Auth::id());
        return $this->jsonResponse($_detail, 'Expense.Detail');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(RegistExpenseRequest $request, int $id)
    {
        $_user = Auth::user();

        $_editData = $request->only('expense', 'regist_date', 'category_id', 'comment', 'repetition_flg');

        $_s3ImgUrl = $this->_s3Service->setDirName()->upload($request->file('receipt_img'));

        $this->_expenseService->editExpense($id, $_editData, $_user, $_s3ImgUrl);

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
        $this->_expenseService->delete($id);

        return response()->json([]);
    }
}
