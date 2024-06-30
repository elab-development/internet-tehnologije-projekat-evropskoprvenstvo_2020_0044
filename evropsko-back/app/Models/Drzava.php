<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Drzava extends Model
{
    use HasFactory;

    public const TABLE = 'drzave';

    protected $table = self::TABLE;

    protected $fillable = [
        'nazivDrzave',
        'grupa_id',
        'grb',
    ];

    public function grupa()
    {
        return $this->belongsTo(Grupa::class);
    }
}
