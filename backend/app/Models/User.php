<?php

namespace App\Models;

use App\Models\Core\UserBaseModel;
use App\Notifications\PasswordResetNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

use function PHPUnit\Framework\returnSelf;

class User extends UserBaseModel
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


    public function sendPasswordResetNotification($token)
    {
        $this->notify(new PasswordResetNotification($token));
    }


    public function insert(array $_userData): void
    {
        $_insert = $this->_createInsertUpdateData($_userData, $this->_getBaseDefaultInsertData());

        DB::table('users')->insert($_insert);
        return;
    }

    public function updateByEmail(array $_data): void
    {
        $_update = $this->_createInsertUpdateData($_data, $this->_getBaseDefaultUpdateData());

        DB::table('users')->where('email', $_data['email'])->update($_update);
        return;
    }

    public function findInfoByUserId(string $_userId): array
    {
        $_ret = DB::table('users')
            ->where('id', $_userId)
            ->first();

        return $this->_convertArray($_ret);
    }

    public function countByEmail(string $_email): int
    {
        $_ret = DB::table('users')
            ->where('email', $_email)
            ->count();

        return $_ret;
    }

    public function findListByRoomId(string $_roomId): array
    {
        $_ret = DB::table('users')
            ->where('room_id', $_roomId)
            ->leftJoin('user_profiles as up', 'users.id', '=', 'up.user_id')
            ->leftJoin('s3_images as si', 'up.s3_image_id', '=', 'si.s3_image_id')
            ->select('users.id', 'users.name', 'up.nickname', 'si.img_url')
            ->get();

        return $this->_convertArray($_ret);
    }
}
