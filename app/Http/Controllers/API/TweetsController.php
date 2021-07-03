<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTweetRequest;
use App\Http\Resources\TweetResource;
use App\Models\Tweets;
use Illuminate\Http\Request;

class TweetsController extends Controller
{
    public function index()
    {
        return TweetResource::collection(Tweets::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTweetRequest $request)
    {
        //Paciente::create($request->all());
        /*return response()->json([
            'res' => true,
            'msg' => 'Paciente Guardado Correctamente'
        ],200);*/

        return (new TweetResource(Tweets::create($request->all())))->additional(['msg' => 'Tweet Guardado Correctamente']);
    }

}
