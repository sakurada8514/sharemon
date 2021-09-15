<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function jsonResponse(array $_data = [], string $viewModel = null, int $statusCode = 200)
    {
        if ($viewModel) {
            $_viewModelInstance = $this->_doViewModelInstance($viewModel);

            $_data = $_viewModelInstance->apply($_data);
        }
        return response()->json($_data, $statusCode);
    }

    private function _doViewModelInstance(string $_viewModel)
    {
        $_namespace = 'App\\Http\\ViewModels\\';
        $_classPath = $_namespace . $this->_parseViewName($_viewModel) . 'ViewModel';
        if (!class_exists($_classPath)) {
            throw new Exception('ViewModelが未実装です');
        }

        return new $_classPath($_viewModel);
    }

    private function _parseViewName(string $view)
    {
        return implode("\\", array_map(function ($name) {
            return ucfirst($name);
        }, explode('.', $view)));
    }
}
