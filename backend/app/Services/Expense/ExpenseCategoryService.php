<?php

namespace App\Services\Expense;

use App\Models\Tables\ExpenseCategoryModel;
use App\Services\Core\BaseService;
use Illuminate\Support\Facades\Cache;

class ExpenseCategoryService extends BaseService
{
    private ?ExpenseCategoryModel $_expenseCategoryModel = null;

    public function __construct(
        ExpenseCategoryModel $_expenseCategoryModel
    ) {
        $this->_expenseCategoryModel = $_expenseCategoryModel;
    }

    public function findCategoryList(string $_roomId): array
    {
        return Cache::rememberForever($this->_createCacheKey($_roomId), function () use ($_roomId) {
            return $this->_expenseCategoryModel->findListByRoomId($_roomId);
        });
    }

    private function _createCacheKey(string $_roomId)
    {
        return 'expenseCategoryDatas::' . $_roomId;
    }
}
