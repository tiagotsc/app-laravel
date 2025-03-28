<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeploysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deploys', function (Blueprint $table) {
            $table->id();
            $table->string('repository');
            $table->string('enveronment');
            $table->string('action');
            $table->foreignId('user_id');
            $table->enum('status', ['pending', 'complete']);
	    $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deploys');
    }
}
