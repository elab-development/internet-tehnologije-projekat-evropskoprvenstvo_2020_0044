<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rezultat extends Model
{
    use HasFactory;

    public const TABLE = 'rezultati';

    protected $table = self::TABLE;

    protected $fillable = [
        'user_id',
        'drzava_domacin_id',
        'drzava_gost_id',
        'golova_domacin',
        'golova_gost',
        'datum_utakmice',
        'tip_rezultata_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function drzava_domacin()
    {
        return $this->belongsTo(Drzava::class);
    }

    public function drzava_gost()
    {
        return $this->belongsTo(Drzava::class);
    }

    public function tip_rezultata()
    {
        return $this->belongsTo(TipRezultata::class);
    }
}
