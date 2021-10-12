<?php

namespace App\Services;

use App\Models\Tables\ExpenseAlreadyReadUserModel;
use App\Models\Tables\ExpenseCategoryModel;
use App\Models\Tables\ExpenseModel;
use App\Services\Core\BaseService;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\Authenticatable;

class ExpenseService extends BaseService
{
    private ?ExpenseCategoryModel $_expenseCategoryModel = null;
    private ?ExpenseModel $_expenseModel = null;
    private ?ExpenseAlreadyReadUserModel $_expenseAlreadyReadUserModel = null;

    public function __construct(
        ExpenseCategoryModel $_expenseCategoryModel,
        ExpenseModel $_expenseModel,
        ExpenseAlreadyReadUserModel $_expenseAlreadyReadUserModel
    ) {
        $this->_expenseCategoryModel = $_expenseCategoryModel;
        $this->_expenseModel = $_expenseModel;
        $this->_expenseAlreadyReadUserModel = $_expenseAlreadyReadUserModel;
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
        if ($this->_expenseAlreadyReadUserModel->exists($_expenseId, $_userId)) {
            return;
        }

        $_data = [
            'expense_id' => $_expenseId,
            'user_id'    => $_userId
        ];
        $this->_expenseAlreadyReadUserModel->insert($_data);
    }

    public function delete(int $_expenseId)
    {
        $_data = [
            'id' => $_expenseId,
            'del_flg' => config('Const.webDB.DEL_FLG.ON')
        ];
        $this->_expenseModel->updateData($_data);
    }
}
