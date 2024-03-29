<?php

namespace App\Services;

use App\Models\Tables\BudgetModel;
use App\Services\Core\BaseService;
use Illuminate\Contracts\Auth\Authenticatable;

class BudgetService extends BaseService
{
    private ?BudgetModel $_budgetModel = null;

    public function __construct(BudgetModel $_budgetModel)
    {
        $this->_budgetModel = $_budgetModel;
    }

    public function findList(int $_roomId)
    {
        $_budgetList = $this->_budgetModel->findListWithExpenseByRoomId($_roomId);
        array_walk($_budgetList, function (&$_budget) {
            $_budget['percent'] = round(((int)$_budget['total_expense'] / (int)$_budget['budget']) * 100);
            $_budget['remaining'] = (int)$_budget['budget'] - (int)$_budget['total_expense'];
        });
        return $_budgetList;
    }

    public function findDetail(int $_budgetId)
    {
        return $this->_budgetModel->findByBudgetId($_budgetId);
    }

    public function findTotal(int $_roomId)
    {
        return $this->_budgetModel->findTotal($_roomId);
    }

    public function insertBudget(array $_data, Authenticatable $_user)
    {
        $this->_budgetModel->insert($this->_addUserData($_data, $_user));
    }

    public function editBudget(int $_budgetId, array $_data)
    {
        $this->_budgetModel->updateData($_budgetId, $_data);
        return;
    }
}
