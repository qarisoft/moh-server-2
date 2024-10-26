<?php

use App\Models\Floor;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('apartments', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Floor::class)->constrained()->onDelete('cascade');
//            $table->foreignIdFor(Floor::class);
            $table->boolean('is_booked')->default(false);
            $table->boolean('is_soled')->default(false);
            $table->string('info')->nullable();
            $table->integer('number')->default(0);
            $table->integer('rooms')->default(0);
            $table->float('rent_price')->default(0);
            $table->float('sell_price')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apartments');
    }
};
