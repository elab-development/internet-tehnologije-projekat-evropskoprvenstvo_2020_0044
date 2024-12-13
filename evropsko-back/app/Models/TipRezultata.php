<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipRezultata extends Model
{
    use HasFactory;

    protected $table = 'tip_rezultata';

    protected $fillable = [
        'nazivTipa',
    ];

    public function rezultati()
    {
        return $this->hasMany(Rezultat::class);
    }
}
