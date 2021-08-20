<?php

namespace App\Services;

use App\Models\Tables\ExpenseCategoryModel;
use App\Models\Tables\ExpenseModel;
use App\Services\Core\BaseService;
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

    public function findCategoryList(string $_roomId): array
    {
        return $this->_expenseCategoryModel->findListByRoomId($_roomId);
    }

    public function insertExpense(array $_registData, ?string $_s3ImgUrl, Authenticatable $_user)
    {
        $this->_expenseModel->virtualMethodTransaction('insert', [$_registData, $_s3ImgUrl, $_user]);

        return;
    }
}
