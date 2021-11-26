<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        // 'api/user',
        // 'api/regist',
        // 'api/regist/invite',
        // 'api/login',
        // 'api/password/reset',
        // 'api/password/reregist',
        // 'api/logout',
    ];
}
