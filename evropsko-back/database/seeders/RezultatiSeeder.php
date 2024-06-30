<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RezultatiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        $rezultati = [];

        for ($i = 0; $i < 100; $i++) {
            \App\Models\Rezultat::create([
                'drzava_domacin_id' => $faker->numberBetween(1,24),
                'drzava_gost_id' => $faker->numberBetween(1,24),
                'golova_domacin' => $faker->numberBetween(0, 5),
                'golova_gost' => $faker->numberBetween(0, 5),
                'tip_rezultata_id' => $faker->numberBetween(1, 5),
                'datum_utakmice' => $faker->dateTimeBetween('-1 month', '+1 month'),
                'user_id' => $faker->numberBetween(1, 11),
            ]);
        }
    }
}
