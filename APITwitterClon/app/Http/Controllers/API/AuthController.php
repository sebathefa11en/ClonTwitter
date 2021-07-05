<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\HistoryLogin;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException as ValidationValidationException;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->username = $request->username;
        $user->save();

        return response()->json([
            'res' => true,
            'msg' => 'Usuario registrado correctamente'
        ], 200);
    }

    public function login(LoginRequest $request){
        $user = User::where('email', $request->email)->first();
        $log = Carbon::now();
        $history = new HistoryLogin();
        $history->users_id = $user->id;
        $history->timelog = $log;
        $history->save();



    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationValidationException::withMessages([
            'msg' => ['Las credenciales son incorrectas.'],
        ]);
    }

    $token = $user->createToken($request->email)->plainTextToken;

    return response()->json([
        'res' => true,
        'token' => $token,
        'username' => $user->username
    ], 200);
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return response()->json([
            'res' => true,
            'msg' => 'Token eliminado Correctamente'
        ], 200);
    }
}
