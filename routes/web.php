<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SellBookApartments;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/projects');
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
});



Route::resource('projects',ProjectController::class);
Route::post('/projects/{id}/book',[SellBookApartments::class, 'book'])->name('projects.book');
Route::post('/projects/{id}/sell',[SellBookApartments::class, 'sell'])->name('projects.sell');
Route::post('/projects/{id}/cancel',[SellBookApartments::class, 'cancel'])->name('projects.cancel');
Route::post('/projects/{project}/upload',[SellBookApartments::class, 'upload'])->name('projects.add.photo');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
