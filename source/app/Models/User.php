<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function insert(array $_registData): void
    {
        $_registData['password'] = Hash::make($_registData['password']);

        $_insert = $this->_createInsertUpdateData($_registData, $this->_getBaseDefaultInsertData());

        DB::table('users')->insert($_insert);
        return;
    }

    public function uniqueCheckByEmail(string $_email): int
    {
        $_ret = DB::table('users')
            ->where('email', $_email)
            ->count();

        return $_ret;
    }
}
