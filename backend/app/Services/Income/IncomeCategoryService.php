<?php

namespace App\Services\Income;

use App\Models\Tables\IncomeCategoryModel;
use App\Services\Core\BaseService;
use Illuminate\Support\Facades\Cache;

class IncomeCategoryService extends BaseService
{
    private ?IncomeCategoryModel $_incomeCategoryModel = null;

    public function __construct(
        IncomeCategoryModel $_incomeCategoryModel
    ) {
        $this->_incomeCategoryModel = $_incomeCategoryModel;
    }

    public function findCategoryList(string $_roomId): array
    {
        return Cache::rememberForever($this->_createCacheKey($_roomId), function () use ($_roomId) {
            return $this->_incomeCategoryModel->findListByRoomId($_roomId);
        });
    }

    private function _createCacheKey(string $_roomId)
    {
        return 'incomeCategoryDatas::' . $_roomId;
    }
}
