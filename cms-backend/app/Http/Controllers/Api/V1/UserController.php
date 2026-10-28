<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:150'],
            'page' => ['nullable', 'integer', 'min:1'],
            'perPage' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $query = User::query()
            ->with('roles:id,name');

        if (!empty($validated['search'])) {
            $search = $validated['search'];

            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $perPage = $validated['perPage'] ?? 10;

        $users = $query
            ->orderBy('id', 'desc')
            ->paginate($perPage);

        $data = $users->getCollection()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_active' => $user->is_active,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'roles' => $user->roles->map(fn ($role) => [
                    'id' => $role->id,
                    'name' => $role->name,
                ])->values(),
            ];
        });

        return response()->json([
            'data' => $data,
            'pagination' => [
                'currentPage' => $users->currentPage(),
                'perPage' => $users->perPage(),
                'total' => $users->total(),
                'totalPages' => $users->lastPage(),
            ],
        ]);
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'email' => [
                'required',
                'email',
                'max:150',
                'unique:users,email',
            ],
            'password' => ['required', 'string', 'min:8'],
            'is_active' => ['sometimes', 'boolean'],
            'role_ids' => ['sometimes', 'array'],
            'role_ids.*' => ['integer', 'distinct', 'exists:roles,id'],
        ]);

        $user = DB::transaction(function () use ($validated) {

            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => $validated['password'],
                'is_active' => $validated['is_active'] ?? true,
            ]);

            if (array_key_exists('role_ids', $validated)) {
                $user->roles()->sync($validated['role_ids']);
            }

            return $user;
        });

        $user->load('roles:id,name');

        return response()->json([
            'message' => 'Pengguna berhasil ditambahkan.',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_active' => $user->is_active,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'roles' => $user->roles->map(fn ($role) => [
                    'id' => $role->id,
                    'name' => $role->name,
                ])->values(),
            ],
        ], 201);
    }

    // jika ingin menggunakan query manual
    public function storeManual(Request $request)
    {
        // 1. Validasi tetap disarankan agar aman dari SQL Injection & data invalid
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'email' => ['required', 'email', 'max:150', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'is_active' => ['sometimes', 'boolean'],
            'role_ids' => ['sometimes', 'array'],
            'role_ids.*' => ['integer', 'exists:roles,id'],
        ]);

        // 2. Gunakan Transaction manual untuk menjaga konsistensi data
        $resultId = DB::transaction(function () use ($validated) {
            
            // A. Insert manual ke tabel 'users'
            // Menggunakan DB::table()->insertGetId() untuk mendapatkan ID user yang baru saja dibuat
            $isActive = $validated['is_active'] ?? true;
            
            $userId = DB::table('users')->insertGetId([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']), // Hash manual karena tidak pakai Eloquent cast
                'is_active' => $isActive,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // B. Insert manual ke tabel perantara 'user_roles' (jika ada role_ids yang dikirim)
            if (!empty($validated['role_ids'])) {
                $pivotData = [];
                foreach ($validated['role_ids'] as $roleId) {
                    $pivotData[] = [
                        'user_id' => $userId,
                        'role_id' => $roleId,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
                
                // Masukkan banyak baris sekaligus (Bulk Insert) ke tabel pivot
                DB::table('user_roles')->insert($pivotData);
            }

            return $userId;
        });

        // 3. Ambil kembali data yang baru disimpan jika ingin ditampilkan ke respons
        // (Bisa menggunakan query builder manual juga)
        $user = DB::table('users')->where('id', $resultId)->first();
        
        // Ambil rolenya secara manual
        $roles = DB::table('user_roles')
            ->join('roles', 'user_roles.role_id', '=', 'roles.id')
            ->where('user_roles.user_id', $resultId)
            ->select('roles.id', 'roles.name')
            ->get();

        return response()->json([
            'message' => 'Pengguna berhasil ditambahkan secara manual.',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_active' => (bool) $user->is_active,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'roles' => $roles,
            ],
        ], 201);
    }

    public function update(Request $request, int $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:150'],
            'email' => [
                'sometimes',
                'required',
                'email',
                'max:150',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'password' => ['sometimes', 'nullable', 'string', 'min:8'],
            'is_active' => ['sometimes', 'boolean'],
            'role_ids' => ['sometimes', 'array'],
            'role_ids.*' => ['integer', 'distinct', 'exists:roles,id'],
        ]);

        DB::transaction(function () use ($user, $validated) {
            $userData = collect($validated)->only([
                'name',
                'email',
                'is_active',
            ])->all();

            // Password hanya diperbarui jika dikirim dan tidak kosong.
            if (!empty($validated['password'])) {
                $userData['password'] = $validated['password'];
            }

            if (!empty($userData)) {
                $user->update($userData);
            }

            // Jika role_ids tidak dikirim, role lama tetap dipertahankan.
            if (array_key_exists('role_ids', $validated)) {
                $user->roles()->sync($validated['role_ids']);
            }
        });

        $user->load('roles:id,name');

        return response()->json([
            'message' => 'Pengguna berhasil diperbarui.',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_active' => $user->is_active,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'roles' => $user->roles->map(fn ($role) => [
                    'id' => $role->id,
                    'name' => $role->name,
                ])->values(),
            ],
        ]);
    }

    public function destroy(int $id)
    {
        $user = User::findOrFail($id);

        // Cegah penghapusan akun yang sedang digunakan.
        if ($user->id === auth()->id()) {
            return response()->json([
                'message' => 'Anda tidak dapat menghapus akun sendiri.',
            ], 422);
        }

        $user->delete();

        return response()->json([
            'message' => 'Pengguna berhasil dihapus.',
        ]);
    }

}

