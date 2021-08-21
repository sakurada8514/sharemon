<?php

namespace App\Services;

use App\Models\Tables\IncomeCategoryModel;
use App\Models\Tables\IncomeModel;
use App\Services\Core\BaseService;
use Illuminate\Contracts\Auth\Authenticatable;

class IncomeService extends BaseService
{
    private ?IncomeCategoryModel $_incomeCategoryModel = null;
    private ?IncomeModel         $_incomeModel         = null;

    public function __construct(IncomeCategoryModel $_incomeCategoryModel, IncomeModel $_incomeModel)
    {
        $this->_incomeCategoryModel = $_incomeCategoryModel;
        $this->_incomeModel         = $_incomeModel;
    }

    public function findCategoryList(string $_roomId): array
    {
        return $this->_incomeCategoryModel->findListByRoomId($_roomId);
    }

    public function insertIncome(array $_registData, Authenticatable $_user)
    {
        $this->_incomeModel->insert($_registData, $_user);

        return;
    }
}
