<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\BalanceService;
use Illuminate\Http\Request;

class BalanceController extends Controller
{
    private ?BalanceService $_balanceService = null;
    public function __construct(BalanceService $_balanceService)
    {
        $this->_balanceService = $_balanceService;
    }
    public function getBalanceOfMonth()
    {
        list($_expenseTotal, $_incomeTotal) = $this->_balanceService->getBalanceOfThisMonth();

        return $this->jsonResponse(['expense' => $_expenseTotal, 'income' => $_incomeTotal]);
    }

    public function getBalanceOfDaily(string $_date)
    {
        $_balanceList = $this->_balanceService->getBalanceOfDaily($_date);

        return $this->jsonResponse(['daily' => $_balanceList]);
    }
}
