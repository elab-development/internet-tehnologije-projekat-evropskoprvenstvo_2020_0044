<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipRezultataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tipoviRezultata = [
            'Grupa',
            'OsminaFinala',
            'CetvrtFinale',
            'Polufinale',
            'Finale',
        ];

        foreach ($tipoviRezultata as $tipRezultata) {
            \App\Models\TipRezultata::create([
                'nazivTipa' => $tipRezultata,
            ]);
        }
    }
}
