<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            [
                'name' => 'users.read',
                'description' => 'Melihat daftar dan detail pengguna.',
            ],
            [
                'name' => 'users.create',
                'description' => 'Membuat pengguna baru.',
            ],
            [
                'name' => 'users.update',
                'description' => 'Mengubah data pengguna.',
            ],
            [
                'name' => 'users.delete',
                'description' => 'Menghapus pengguna.',
            ],
        ];

        foreach ($permissions as $permission) {
            Permission::updateOrCreate(
                ['name' => $permission['name']],
                ['description' => $permission['description']]
            );
        }

        
        $administrator = \App\Models\Role::where(
            'name',
            'Administrator'
        )->firstOrFail();

        $administrator->permissions()->sync(
            \App\Models\Permission::whereIn('name', [
                'users.read',
                'users.create',
                'users.update',
                'users.delete',
            ])->pluck('id')->all()
        );

    }
}
