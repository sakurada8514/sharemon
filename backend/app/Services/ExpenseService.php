<?php

namespace App\Services;

use App\Models\Tables\ExpenseCategoryModel;
use App\Models\Tables\ExpenseModel;
use App\Services\Core\BaseService;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\Authenticatable;

class ExpenseService extends BaseService
{
    private ?ExpenseCategoryModel $_expenseCategoryModel = null;
    private ?ExpenseModel $_expenseModel = null;

    public function __construct(ExpenseCategoryModel $_expenseCategoryModel, ExpenseModel $_expenseModel)
    {
        $this->_expenseCategoryModel = $_expenseCategoryModel;
        $this->_expenseModel = $_expenseModel;
    }

    public function findListByRoomId(string $_roomId, string $_userId, array $_option)
    {
        $_option['date'] = new Carbon($_option['date']);
        return $this->_expenseModel->findListByRoomId($_roomId, $_userId, $_option);
    }

    public function findDetail(int $_expenseId)
    {
        return $this->_expenseModel->findByExpenseId($_expenseId);
    }

    public function findCategoryList(string $_roomId): array
    {
        return $this->_expenseCategoryModel->findListByRoomId($_roomId);
    }

    public function insertExpense(array $_registData, Authenticatable $_user, ?string $_s3ImgUrl): void
    {
        $this->_expenseModel->virtualMethodTransaction('insert', [$_registData, $_user, $_s3ImgUrl]);

        return;
    }

    public function setReadFlg(int $_expenseId, int $_userId)
    {
        // 既読フラグ
    }
}
