<?php

namespace App\Services;

use App\Models\Tables\ExpenseCategoryModel;
use App\Models\Tables\RoomModel;
use App\Services\Core\BaseService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;

class ExpenseService extends BaseService
{
    private ?ExpenseCategoryModel $_expenseCategoryModel = null;

    public function __construct(ExpenseCategoryModel $_expenseCategoryModel)
    {
        $this->_expenseCategoryModel = $_expenseCategoryModel;
    }

    public function findCategoryList(string $_roomId): array
    {
        return $this->_expenseCategoryModel->findListByRoomId($_roomId);
    }
}
