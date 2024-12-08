<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductList extends Model
{
    use HasFactory;

    protected $table = 'product_lists';

    public function carts()
    {
        return $this->hasMany(CartList::class, 'product_id', 'id');
    }

    protected $fillable = [
        'product_name',
        'price',
        'description',
        'category',
        'bar_code',
        'stock_quantity'
    ];
}
