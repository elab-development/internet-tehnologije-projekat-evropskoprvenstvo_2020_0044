<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Drzava;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin user',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin'),
            'role' => 'admin',
        ]);
         \App\Models\User::factory(10)->create();

            $this->call([
                GrupaSeeder::class,
                TipRezultataSeeder::class,
                DrzaveSeeder::class,
                RezultatiSeeder::class,
            ]);

    }
}
