<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userAdm = User::where('name','Admin')->first();
        if($userAdm == null){
            DB::table('users')->insert(
                [
                    'name' => 'Admin',
                    'username' => 'admin',
                    'email' => 'admin@teste.br',
                    'password' => Hash::make('admin'),
                    'active' => '1',
                    'created_at' => NOW(),
                    'updated_at' => NOW()
                ]
            );
            $userAdm = User::where('name','Admin')->first();
            $userAdm->assignRole('Super-Admin');
        }
    }
}
