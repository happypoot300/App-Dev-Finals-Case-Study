<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductList;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $products = ProductList::query();
        if ($request->has('sort')) {
            $column_name = $request->input('sort');
            $order = $request->input('order', 'asc'); //default
            $products = $products->orderBy($column_name, $order);
            $products = $products->get();
        } else if ($request->has('category')) {
            $category_name = $request->input('category');
            $products = $products->where('category', $category_name);
            $products = $products->get();
        } else {
            $products = ProductList::all();
        }

        return response()->json($products);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $product = new ProductList();
        $product->product_name = $request->product_name;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->category = $request->category;
        $product->bar_code = $request->bar_code;
        $product->stock_quantity = $request->stock_quantity;
        $product->save();
        return response()->json($product);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = ProductList::find($id);
        return response()->json($product);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = ProductList::find($id);
        $product->product_name = $request->product_name;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->category = $request->category;
        $product->bar_code = $request->bar_code;
        $product->stock_quantity = $request->stock_quantity;
        $product->save();
        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = ProductList::find($id);
        $product->delete();
    }
}
