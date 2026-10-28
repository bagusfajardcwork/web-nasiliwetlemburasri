
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('role_permissions', function (Blueprint $table) {
            $table->integer('role_id');
            $table->integer('permission_id');

            $table->primary(['role_id', 'permission_id']);

            $table->index(
                'permission_id',
                'role_permissions_permission_id_permissions_id_fk'
            );

            $table->foreign(
                'permission_id',
                'role_permissions_permission_id_permissions_id_fk'
            )
                ->references('id')
                ->on('permissions')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign(
                'role_id',
                'role_permissions_role_id_roles_id_fk'
            )
                ->references('id')
                ->on('roles')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('role_permissions');
    }
};
