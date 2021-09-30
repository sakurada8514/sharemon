<?php

namespace App\Http\ViewModels\Expense;

use App\Http\ViewModels\Core\CommonTrait;
use App\Http\ViewModels\Core\ViewModel;

class ListViewModel implements ViewModel
{
    use CommonTrait;
    public function apply(array $data): array
    {
        array_walk($data['data'], function (&$_data) {
            $_data['regist_date'] = $this->convertDate($_data['regist_date']);
            $_data['read_flg'] = is_null($_data['read_flg']) ? false : true;
        });

        return [
            'expenseList' =>  $data['data']
        ];
    }
}
