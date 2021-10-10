<?php

namespace App\Http\ViewModels\Income;

use App\Http\ViewModels\Core\CommonTrait;
use App\Http\ViewModels\Core\ViewModel;

class DetailViewModel implements ViewModel
{
    use CommonTrait;
    public function apply(array $data): array
    {

        $data['regist_date'] = $this->convertDate($data['regist_date']);
        $data['repetition_flg'] = $data['repetition_flg'] === config('Const.webDB.EXPENSES.REPETITION_FLG.OFF') ? false : true;


        return [
            'detail' =>  $data
        ];
    }
}
