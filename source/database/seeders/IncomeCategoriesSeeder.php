<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IncomeCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('income_categories')->insert([
            [
                'category_name' => '給与',
                'all_flg' => '1',
                'del_flg' => '0'
            ],
            [
                'category_name' => '賞与',
                'all_flg' => '1',
                'del_flg' => '0'
            ],
            [
                'category_name' => '事業所得',
                'all_flg' => '1',
                'del_flg' => '0'
            ],
            [
                'category_name' => '副業所得',
                'all_flg' => '1',
                'del_flg' => '0'
            ],
            [
                'category_name' => '臨時収入',
                'all_flg' => '1',
                'del_flg' => '0'
            ],
        ]);
    }
}
