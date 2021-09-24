<?php

namespace App\Services;

use App\Models\Tables\ExpenseCategoryModel;
use App\Models\Tables\ExpenseModel;
use App\Models\Tables\IncomeModel;
use App\Services\Core\BaseService;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;

class BalanceService extends BaseService
{
    private ?ExpenseModel $_expenseModel = null;
    private ?IncomeModel $_incomeModel = null;

    public function __construct(ExpenseModel $_expenseModel, IncomeModel $_incomeModel)
    {
        $this->_expenseModel = $_expenseModel;
        $this->_incomeModel = $_incomeModel;
    }
    public function getBalanceOfThisMonth()
    {
        $_roomId = Auth::user()->room_id;
        $_expenseTotal = $this->_expenseModel->findTotalOfThisMonth($_roomId);
        $_incomeTotal = $this->_incomeModel->findTotalOfThisMonth($_roomId);

        return [$_expenseTotal, $_incomeTotal];
    }
}
