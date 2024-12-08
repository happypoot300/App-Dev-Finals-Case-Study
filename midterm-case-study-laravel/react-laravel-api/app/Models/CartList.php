<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class CartList extends Model
{
    protected $table = 'cart_lists';

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function product()
    {
        return $this->belongsTo(ProductList::class, 'product_id', 'id');
    }

    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
    ];
}
