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

    public function insertExpense(array $_registData, Authenticatable $_user)
    {
        $_registData['regist_date'] = $this->_doConvertDate($_registData['regist_date']);
        $_data = $this->_addUserData($_registData, $_user);

        $this->_expenseModel->insert($_data);

        return;
    }
}
