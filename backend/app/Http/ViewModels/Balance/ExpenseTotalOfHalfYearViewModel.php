<?php

namespace App\Http\ViewModels\Balance;

use App\Http\ViewModels\Core\CommonTrait;
use App\Http\ViewModels\Core\ViewModel;

class ExpenseTotalOfHalfYearViewModel implements ViewModel
{
    use CommonTrait;
    public function apply(array $data): array
    {
        array_multisort(array_map("strtotime", array_column($data, 'total_month')), SORT_ASC, $data);
        array_walk($data, function (&$_item) {
            $_item['total_month'] = $this->convertDate($_item['total_month'], 'n月');
        });

        return [
            'halfYearData' =>  $data
        ];
    }
}
