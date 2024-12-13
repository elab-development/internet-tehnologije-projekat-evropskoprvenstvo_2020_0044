<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResurs;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends ResponseController
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->error('Morate poslati email i lozinku.', $validator->errors(), 400);
        }

        $credentials = $request->only('email', 'password');

        if (!auth()->attempt($credentials)) {
            return $this->error('Pogrešan email ili lozinka.', [], 401);
        }

        $user = auth()->user();

        $token = $user->createToken('authToken')->plainTextToken;


        return $this->success([
            'user' => new UserResurs($user),
            'token' => $token
        ], 'Uspešno ste se prijavili.');
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return $this->success([], 'Uspešno ste se odjavili.');
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->error('Greska pri validaciji', $validator->errors(), 400);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();

        return $this->success([
            'user' => new UserResurs($user)
        ], 'Uspešno ste se registrovali.');
    }
}
