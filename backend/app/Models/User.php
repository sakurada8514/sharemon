<?php

namespace App\Models;

use App\Models\Core\UserBaseModel;
use App\Models\Tables\S3ImageModel;
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

    public function updateData(array $_data, ?string $_s3ImgUrl = null)
    {
        $_s3ImageModel = new S3ImageModel();
        if (isset($_s3ImgUrl)) {
            $_s3ImageId = $_s3ImageModel->insert($_s3ImgUrl);
            $_updateProfile = $this->_createInsertUpdateData(['s3_image_id' => $_s3ImageId], $this->_getBaseDefaultUpdateData());
            DB::table('user_profiles')->updateOrInsert(['user_id' => $_data['id']], $_updateProfile);
        }

        $_update = $this->_createInsertUpdateData($_data, $this->_getBaseDefaultUpdateData());
        DB::table('users')->where('id', $_data['id'])->update($_update);
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

    public function findProfile(string $_userId)
    {
        $_ret = DB::table('users')
            ->where('id', $_userId)
            ->leftJoin('user_profiles as up', 'users.id', '=', 'up.user_id')
            ->leftJoin('s3_images as si', 'up.s3_image_id', '=', 'si.s3_image_id')
            ->select('users.id', 'users.name', 'si.img_url')
            ->first();

        return $this->_convertArray($_ret);
    }

    public function existsByEmail(string $_email): bool
    {
        return DB::table('users')
            ->where('email', $_email)
            ->exists();
    }

    public function findListByRoomId(string $_roomId): array
    {
        $_ret = DB::table('users')
            ->where('room_id', $_roomId)
            ->leftJoin('user_profiles as up', 'users.id', '=', 'up.user_id')
            ->leftJoin('s3_images as si', 'up.s3_image_id', '=', 'si.s3_image_id')
            ->select('users.id', 'users.name', 'si.img_url')
            ->get();

        return $this->_convertArray($_ret);
    }
}
