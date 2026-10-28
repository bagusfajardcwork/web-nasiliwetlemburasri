<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Administrator',
                'description' => 'Memiliki akses administrasi sistem.',
            ],
            [
                'name' => 'Supervisor',
                'description' => 'Memiliki akses pengawasan operasional.',
            ],
            [
                'name' => 'Staff',
                'description' => 'Memiliki akses operasional sesuai izin.',
            ],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['name' => $role['name']],
                ['description' => $role['description']]
            );
        }
    }
}
