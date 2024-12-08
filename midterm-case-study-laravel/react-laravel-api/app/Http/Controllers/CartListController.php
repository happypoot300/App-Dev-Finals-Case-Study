<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartList;
use App\Models\ProductList;
use App\Models\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;


class CartListController extends Controller
{

    use AuthenticatesUsers;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        /*         $user = User::find($request->user_id);
        $carts = $user->carts()->with('product')->get();
        return response()->json($carts); */
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
        $cart = new CartList();
        $cart->user_id = $request->user_id;
        $cart->product_id = $request->product_id;
        $cart->quantity = $request->quantity;
        $cart->save();
        return response()->json($cart);
    }

    /**
     * Display the specified resource.
     */
    public function show($user_id)
    {
        $user = User::find($user_id);
        $carts = $user->carts()->with('product')->get();
        return response()->json($carts);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $itemId)
    {
        $cart = CartList::find($itemId);
        $cart->quantity = $request->quantity;
        $cart->save();
        return response()->json($cart);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cart = CartList::find($id);
        $cart->delete();
    }
    public function clearCart(string $userId)
    {
        $carts = CartList::where('user_id', $userId)->get();
        foreach ($carts as $cart) {
            $cart->delete();
        }
    }
}
