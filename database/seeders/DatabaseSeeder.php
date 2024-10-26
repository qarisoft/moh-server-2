<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 't@t.t',
        ]);


        Project::factory(1)->create()->map(function ($p) {
            for ($i = 0; $i < 2; $i++) {
                $p->floors()->create();
                $p->floors()->get()->map(function ($f) {
                    for ($i = 0; $i < 2; $i++) {
                        $f->apartments()->create();
                    }
                });
            }
        });


        Customer::factory(10)->create();
        Project::factory(2)->create();
    }
}
