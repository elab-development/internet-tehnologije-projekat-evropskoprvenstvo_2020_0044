<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grupa extends Model
{
    use HasFactory;

    public const TABLE = 'grupe';

    protected $table = self::TABLE;

    protected $fillable = [
        'nazivGrupe',
    ];

    public function drzave()
    {
        return $this->hasMany(Drzava::class);
    }
}
