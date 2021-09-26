<?php

namespace App\Http\ViewModels\Core;

trait CommonTrait
{
    public function convertDate(?string $_date, string $_format = 'n/j'): ?string
    {
        if (!$_date || $_date == '0000-00-00' || $_date == '0000-00-00 00:00:00') {
            return null;
        }

        return (new \DateTime($_date))->format($_format);
    }
}
