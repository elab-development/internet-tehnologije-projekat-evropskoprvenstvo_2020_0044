<?php

use App\Models\Rezultat;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create(Rezultat::TABLE, function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('drzava_domacin_id');
            $table->unsignedBigInteger('drzava_gost_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('tip_rezultata_id');
            $table->integer('golova_domacin');
            $table->integer('golova_gost');
            $table->date('datum_utakmice');
            $table->foreign('drzava_domacin_id')->references('id')->on('drzave');
            $table->foreign('drzava_gost_id')->references('id')->on('drzave');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('tip_rezultata_id')->references('id')->on('tip_rezultata');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(Rezultat::TABLE);
    }
};
