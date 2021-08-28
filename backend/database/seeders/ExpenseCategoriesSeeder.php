<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExpenseCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('expense_categories')->insert([
            [
                'category_name' => '食費',
                'all_flg' => '1',
                'del_flg' => '0'
            ],
            [
                'category_name' => '外食費',
                'all_flg' => '1',
                'del_flg' => '0'
            ],
            [
                'category_name' => '日用品費',
                'all_flg' => '1',
                'del_flg' => '0'
            ],
            [
                'category_name' => '住居費',
                'all_flg' => '1',
                'del_flg' => '0'
            ],
            [
                'category_name' => '電気代',
                'all_flg' => '1',
                'del_flg' => '0'
            ],
            [
                'category_name' => 'ガス代',
                'all_flg' => '1',
                'del_flg' => '0'
            ],
            [
                'category_name' => '水道代',
                'all_flg' => '1',
                'del_flg' => '0'
            ],
            [
                'category_name' => '通信費',
                'all_flg' => '1',
                'del_flg' => '0'
            ],
            [
                'category_name' => '交通費、車両費',
                'all_flg' => '1',
                'del_flg' => '0'
            ],
            [
                'category_name' => '美容費',
                'all_flg' => '1',
                'del_flg' => '0'
            ],
            [
                'category_name' => 'レジャー費',
                'all_flg' => '1',
                'del_flg' => '0'
            ],
            [
                'category_name' => '教育費',
                'all_flg' => '1',
                'del_flg' => '0'
            ],
            [
                'category_name' => '医療費',
                'all_flg' => '1',
                'del_flg' => '0'
            ],
        ]);
    }
}
