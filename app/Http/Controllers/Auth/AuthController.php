<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'max:255', 'min:6'],
            'email' => ['required', 'unique:users,email'],
            'password' => ['required', 'max:255', 'min:6'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'status' => 500,
                'data' => $validator->errors(),
            ]);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = $user->createToken('user')->accessToken;

        return response()->json([
            'success' => true,
            'status' => 200,
            'data' => ['token' => $token, 'user' => $user],
        ]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required'],
            'password' => ['required', 'max:255', 'min:6'],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'status' => 500,
                'data' => $validator->errors(),
            ]);
        }

        $user = User::where('email', $request->email)->first();
        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('user')->accessToken;

                return response()->json([
                    'success' => true,
                    'status' => 200,
                    'data' => ['token' => $token, 'user' => $user],
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'status' => 500,
                    'data' => 'wrong_password',
                ]);
            }
        } else {
            return response()->json([
                'success' => false,
                'status' => 500,
                'data' => 'wrong_email',
            ]);
        }
    }
}
