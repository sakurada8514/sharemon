<?php

namespace App\Services\Income;

use App\Models\Tables\IncomeAlreadyReadUserModel;
use App\Models\Tables\IncomeCategoryModel;
use App\Models\Tables\IncomeModel;
use App\Services\Core\BaseService;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\Authenticatable;

class IncomeService extends BaseService
{
    private ?IncomeCategoryModel $_incomeCategoryModel = null;
    private ?IncomeModel         $_incomeModel         = null;
    private ?IncomeAlreadyReadUserModel $_incomeAlreadyReadUserModel = null;

    public function __construct(
        IncomeCategoryModel $_incomeCategoryModel,
        IncomeModel $_incomeModel,
        IncomeAlreadyReadUserModel $_incomeAlreadyReadUserModel
    ) {
        $this->_incomeCategoryModel = $_incomeCategoryModel;
        $this->_incomeModel         = $_incomeModel;
        $this->_incomeAlreadyReadUserModel = $_incomeAlreadyReadUserModel;
    }

    public function insertIncome(array $_registData, Authenticatable $_user): void
    {
        $this->_incomeModel->insert($this->_addUserData($_registData, $_user));

        return;
    }

    public function editIncome(int $_incomeId, array $_editData, Authenticatable $_user)
    {
        $this->_incomeModel->updateData($this->_addUserData(array_merge(['id' => $_incomeId], $_editData), $_user));
        return;
    }

    public function findListByRoomId(string $_roomId, string $_userId, array $_option)
    {
        $_option['date'] = new Carbon($_option['date']);
        return $this->_incomeModel->findListByRoomId($_roomId, $_userId, $_option);
    }

    public function findDetail(int $_incomeId)
    {
        return $this->_incomeModel->findByIncomeId($_incomeId);
    }


    public function setReadFlg(int $_incomeId, int $_userId)
    {
        if ($this->_incomeAlreadyReadUserModel->exists($_incomeId, $_userId)) {
            return;
        }

        $_data = [
            'income_id' => $_incomeId,
            'user_id'    => $_userId
        ];
        $this->_incomeAlreadyReadUserModel->insert($_data);
    }

    public function delete(int $_incomeId)
    {
        $_data = [
            'id' => $_incomeId,
            'del_flg' => config('Const.webDB.DEL_FLG.ON')
        ];
        $this->_incomeModel->updateData($_data);
    }
}
