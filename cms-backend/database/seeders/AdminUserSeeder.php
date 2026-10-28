<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $name = env('ADMIN_NAME');
        $email = env('ADMIN_EMAIL');
        $password = env('ADMIN_PASSWORD');

        if (empty($name) || empty($email) || empty($password)) {
            throw new RuntimeException(
                'ADMIN_NAME, ADMIN_EMAIL, dan ADMIN_PASSWORD wajib diisi di .env.'
            );
        }

        DB::transaction(function () use ($name, $email, $password) {
            $role = Role::where('name', 'Administrator')->firstOrFail();

            $user = User::firstOrNew([
                'email' => $email,
            ]);

            if (! $user->exists) {
                $user->name = $name;
                $user->password = Hash::make($password);
                $user->is_active = true;
                $user->save();
            }

            $user->roles()->syncWithoutDetaching([$role->id]);
        });
    }
}
