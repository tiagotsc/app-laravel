<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $allPermissionsBD = DB::table('permissions')->pluck('name')->toArray();
        $permissions = [
            [
                'name' => 'permissions.manager',
                'guard_name' => 'web',
                'created_at' => NOW(),
                'updated_at' => NOW(),
            ],
            [
                'name' => 'roles.manager',
                'guard_name' => 'web',
                'created_at' => NOW(),
                'updated_at' => NOW(),
            ],
            [
                'name' => 'users.manager',
                'guard_name' => 'web',
                'created_at' => NOW(),
                'updated_at' => NOW(),
            ],
            [
                'name' => 'deploys.manager',
                'guard_name' => 'web',
                'created_at' => NOW(),
                'updated_at' => NOW(),
            ],
        ];
        foreach($permissions as $perm){
            if(!in_array($perm['name'], $allPermissionsBD)){
                DB::table('permissions')->insert($perm);
            }
        }
    }
}
