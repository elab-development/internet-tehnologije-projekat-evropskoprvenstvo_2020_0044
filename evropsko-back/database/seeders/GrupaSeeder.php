<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GrupaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $grupe = [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
        ];

        foreach ($grupe as $grupa) {
            \App\Models\Grupa::create([
                'nazivGrupe' => $grupa,
            ]);
        }
    }
}
