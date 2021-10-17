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
        return $this->_budgetModel->findListByRoomId($_roomId);
    }

    public function insertBudget(array $_data, Authenticatable $_user)
    {
        $this->_budgetModel->insert($this->_addUserData($_data, $_user));
    }
}
