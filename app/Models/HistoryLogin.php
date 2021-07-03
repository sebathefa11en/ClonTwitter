<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoryLogin extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'timelog'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function user()
    {
        return $this->belongsToMany(User::class, 'users');
    }
}
