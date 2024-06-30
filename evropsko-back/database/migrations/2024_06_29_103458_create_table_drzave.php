<?php

use App\Models\Drzava;
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
        Schema::create(Drzava::TABLE, function (Blueprint $table) {
            $table->id();
            $table->string('nazivDrzave');
            $table->unsignedBigInteger('grupa_id');
            $table->foreign('grupa_id')->references('id')->on('grupe');
            $table->string('grb');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(Drzava::TABLE);
    }
};
