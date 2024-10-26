<?php

use App\Http\Controllers\ApartmentController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\FloorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SellBookApartments;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/projects');

});


Route::resource('projects', ProjectController::class);
Route::resource('customers', CustomerController::class);
Route::delete('/customers/{customer}/delete', [CustomerController::class, 'destroy'])->name('customers.delete');
Route::resource('apartments', ApartmentController::class);
Route::resource('floors', FloorController::class);

Route::post('/projects/{id}/book', [SellBookApartments::class, 'book'])->name('projects.book');
Route::post('/projects/{id}/sell', [SellBookApartments::class, 'sell'])->name('projects.sell');
Route::post('/projects/{id}/cancel', [SellBookApartments::class, 'cancel'])->name('projects.cancel');

Route::post('/projects/{project}/image/upload', [SellBookApartments::class, 'upload'])->name('projects.add.photo');
Route::delete('/projects/{image}/delete', [SellBookApartments::class, 'delete'])->name('projects.delete.image');

Route::post('/projects/{project}/add-floor-ap', [ProjectController::class, 'addFloorWithApartments'])->name('projects.add.floor-ap');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
