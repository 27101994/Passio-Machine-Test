<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->integer('followers_count')->default(0);
            $table->integer('following_count')->default(0);
            $table->text('bio')->nullable();
            $table->boolean('is_admin')->nullable();
            $table->boolean('blocked')->default(false);
            $table->timestamps();
        });

        // Insert the admin user
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin@1234'),
            'is_admin' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Delete the admin user
        DB::table('users')->where('email', 'admin@gmail.com')->delete();

        Schema::dropIfExists('users');
    }
};


