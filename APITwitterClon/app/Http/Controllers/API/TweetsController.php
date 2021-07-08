<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTweetRequest;
use App\Http\Resources\TweetResource;
use App\Models\Tweets;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TweetsController extends Controller
{
    public function index()
    {
        $sql = "SELECT t.id, t.tweet,users.username, t.date FROM tweets as t INNER JOIN users on users.id = t.user_id ORDER BY t.id DESC";
        return DB::select($sql);
        //return TweetResource::collection(Tweets::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTweetRequest $request)
    {
        $tweets = new Tweets();
        $log = Carbon::now();
        $tweets->tweet = $request->tweet;
        $tweets->user_id = $request->user_id;
        $tweets->date = $log;
        $tweets->save();
        //Paciente::create($request->all());
        return response()->json([
            'res' => true,
            'msg' => 'Tweet guardado correctamente'
        ],200);

        //return (new TweetResource(Tweets::create($request->all())))->additional(['msg' => 'Tweet Guardado Correctamente']);
    }

}
