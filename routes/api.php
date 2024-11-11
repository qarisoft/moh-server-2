<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/projects', function (Request $request) {
    return \App\Models\Project::all()
        ->map(function ($item) {

            return [
                'title' => $item->name,
                'description' => $item->description,
                'media' => $item->getMedia()->map(function ($item) {
                    return [
                        'path' => $item->original_url,
                    ];
                }),

            ];
        });
});
