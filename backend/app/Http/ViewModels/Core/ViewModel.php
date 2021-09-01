<?php

namespace App\Http\ViewModels\Core;

interface ViewModel
{
    public function apply(array $_data): array;
}
