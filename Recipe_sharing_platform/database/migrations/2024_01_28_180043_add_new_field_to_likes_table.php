<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('likes', function (Blueprint $table) {
            // Add a new column 'type' to represent like (1) or dislike (0)
            $table->tinyInteger('type')->default(1)->comment('1 for like, 0 for dislike');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('likes', function (Blueprint $table) {
            // Drop the 'type' column when rolling back the migration
            $table->dropColumn('type');
        });
    }
};
