<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $perfilSuperAdm = DB::table('roles')->where('name','Super-Admin')->first();
        if($perfilSuperAdm == null){
            DB::table('roles')->insert(
                [
                    'name' => 'Super-Admin',
                    'guard_name' => 'web',
                    'created_at' => NOW(),
                    'updated_at' => NOW()
                ]
            );
        }
    }
}
