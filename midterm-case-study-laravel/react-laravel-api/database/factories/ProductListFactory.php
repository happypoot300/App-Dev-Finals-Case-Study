<?php

namespace Database\Factories;

const CATEGORIES = [
    'Automotive',
    'Beauty & Personal Care',
    'Electronics',
    'Fashion',
    'Health & Fitness',
    'Home & Kitchen',
    'Sports & Outdoors',
    'Toys & Games',
];

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductListFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {


        return [
            'product_name' => fake()->word(),
            'price' => fake()->numberBetween(100, 10000),
            'description' => fake()->text(),
            'category' => fake()->randomElement(CATEGORIES),
            'bar_code' => fake()->numberBetween(100000, 999999),
            'stock_quantity' => fake()->numberBetween(0, 100),
        ];
    }
}
