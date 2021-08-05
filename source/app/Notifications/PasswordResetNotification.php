<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\URL;

class PasswordResetNotification extends ResetPassword
{
    use Queueable;

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        if (static::$toMailCallback) {
            return call_user_func(static::$toMailCallback, $notifiable, $this->token);
        }

        return (new MailMessage)
            ->subject('パスワードリセット通知')
            ->view('emails.passwordReset', [
                'reset_url' => URL::temporarySignedRoute('password.reset', now()->addMinutes(30), ['email' => $notifiable->getEmailForPasswordReset()])
            ]);
    }
}
