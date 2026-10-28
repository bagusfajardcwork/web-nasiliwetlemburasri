
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_roles', function (Blueprint $table) {
            $table->integer('user_id');
            $table->integer('role_id');

            $table->primary(['user_id', 'role_id']);

            $table->index(
                'role_id',
                'user_roles_role_id_roles_id_fk'
            );

            $table->foreign('user_id', 'user_roles_user_id_users_id_fk')
                ->references('id')
                ->on('users')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign('role_id', 'user_roles_role_id_roles_id_fk')
                ->references('id')
                ->on('roles')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_roles');
    }
};
