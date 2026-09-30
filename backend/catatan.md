# Drizzle ORM — Generate, Migrate, dan Seed

## 1. `db:generate`

```bash
bun run db:generate
```

**Fungsi:** membuat file migration berdasarkan perubahan pada schema.

Alurnya:

```text
schema.ts
   ↓
db:generate
   ↓
file migration (.sql)
```

Contoh:

Kita menambahkan kolom:

```ts
phone: varchar('phone', { length: 20 }),
```

Lalu jalankan:

```bash
bun run db:generate
```

Drizzle akan membuat file migration yang berisi perubahan SQL, misalnya:

```sql
ALTER TABLE users ADD phone VARCHAR(20);
```

> `generate` **belum mengubah database**. Hanya membuat file migration.

---

## 2. `db:migrate`

```bash
bun run db:migrate
```

**Fungsi:** menjalankan file migration ke database.

Alurnya:

```text
file migration
      ↓
db:migrate
      ↓
MySQL database
```

Misalnya migration berisi:

```sql
ALTER TABLE users ADD phone VARCHAR(20);
```

Setelah menjalankan:

```bash
bun run db:migrate
```

maka kolom `phone` benar-benar ditambahkan ke database MySQL.

---

## 3. `drizzle-kit migrate`

```bash
bunx drizzle-kit migrate
```

Fungsinya **sama dengan `db:migrate`** jika `package.json` memiliki:

```json
{
  "scripts": {
    "db:migrate": "drizzle-kit migrate"
  }
}
```

Jadi:

```bash
bun run db:migrate
```

sama dengan:

```bash
bunx drizzle-kit migrate
```

Perbedaannya hanya cara menjalankan command.

---

## 4. `db:seed`

```bash
bun run db:seed
```

**Fungsi:** memasukkan data awal ke database.

Contoh data awal:

```text
Administrator
Admin
Customer
Category
Product
```

Seeder biasanya digunakan untuk membuat data yang dibutuhkan ketika aplikasi pertama kali dijalankan.

> `seed` digunakan untuk **mengisi data**, bukan membuat struktur tabel.

---

# Perbedaan Utama

| Command               | Fungsi                                        |
| --------------------- | --------------------------------------------- |
| `db:generate`         | Membuat file migration                        |
| `db:migrate`          | Menjalankan migration ke database             |
| `drizzle-kit migrate` | Sama dengan `db:migrate` jika script-nya sama |
| `db:seed`             | Memasukkan data awal                          |

---

# Workflow Drizzle

Jika membuat atau mengubah schema:

```text
1. Ubah schema
       ↓
2. db:generate
       ↓
3. db:migrate
       ↓
4. Database berubah
```

Jika membutuhkan data awal:

```text
Database sudah memiliki tabel
       ↓
db:seed
       ↓
Data awal masuk
```

## Contoh

Setelah membuat schema:

```bash
bun run db:generate
```

Kemudian jalankan migration:

```bash
bun run db:migrate
```

Kemudian masukkan data awal:

```bash
bun run db:seed
```

### Ingatan sederhana

```text
GENERATE = Buat migration
MIGRATE  = Jalankan migration
SEED     = Isi data
```

Atau:

```text
Schema
  ↓
GENERATE
  ↓
Migration
  ↓
MIGRATE
  ↓
Database
  ↓
SEED
  ↓
Data awal
```
