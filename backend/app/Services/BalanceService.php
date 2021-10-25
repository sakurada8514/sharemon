<?php

namespace App\Services;

use App\Models\Tables\ExpenseCategoryModel;
use App\Models\Tables\ExpenseModel;
use App\Models\Tables\IncomeModel;
use App\Services\Core\BaseService;
use Carbon\Carbon;
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

    public function getBalanceOfDaily(string $_date)
    {
        $_roomId = Auth::user()->room_id;

        $_expenseDaily = array_column($this->_expenseModel->findExpenseDaily($_roomId, new Carbon($_date)), 'daily_total', 'regist_date');
        $_incomeDaily =  array_column($this->_incomeModel->findIncomeDaily($_roomId, new Carbon($_date)), 'daily_total', 'regist_date');

        return ['expense' => $_expenseDaily, 'income' => $_incomeDaily];
    }

    public function getBalanceByCategory(string $_date)
    {
        $_roomId = Auth::user()->room_id;
        $_expense = $this->_expenseModel->findExpenseTotalByCategory($_roomId, new Carbon($_date));
        $_income = $this->_incomeModel->findIncomeTotalByCategory($_roomId, new Carbon($_date));
        return ['expense' => $_expense, 'income' => $_income];
    }
}
