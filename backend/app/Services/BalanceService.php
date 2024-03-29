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

    // TODO:: expenseとincome分けるべき
    public function getBalanceOfThisMonth(string $_date)
    {
        $_roomId = Auth::user()->room_id;
        $_expenseTotal = $this->_expenseModel->findTotalOfThisMonth($_roomId, new Carbon($_date));
        $_incomeTotal = $this->_incomeModel->findTotalOfThisMonth($_roomId, new Carbon($_date));

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

    public function getExpenseTotalOfHalfYear()
    {
        $_repetitionExpenseList = $this->_expenseModel->findByRepetition(Auth::user()->room_id);
        $_expenseTotal = $this->_expenseModel->findTotalOfHalfYear(Auth::user()->room_id);

        for ($i = 0; $i < 6; $i++) {
            foreach ($_expenseTotal as $item) {
                if ((new Carbon($item['total_month']))->startOfMonth()->eq(now()->subMonth($i)->startOfMonth())) {
                    continue 2;
                }
            }
            $_expenseTotal[] = [
                'total' => '0',
                'total_month' => now()->subMonth($i)->format('Y-m')
            ];
        }

        array_walk($_expenseTotal, function (&$_data) use ($_repetitionExpenseList) {
            foreach ($_repetitionExpenseList as $_repetitionExpense) {
                if ((new Carbon($_data['total_month']))->gt((new Carbon($_repetitionExpense['regist_month'])))) {
                    $_data['total'] += $_repetitionExpense['expense'];
                }
            }
        });
        return $_expenseTotal;
    }
}
