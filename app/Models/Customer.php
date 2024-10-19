<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Customer extends Model
{
    use HasFactory;
        protected $fillable=[
        'name',
        'address',
        'phone',
    ];


    public function apartments():HasManyThrough
    {
        return $this->hasManyThrough(Apartment::class,Operation::class);
    }


    public function operations()
    {
        return $this->hasMany(Operation::class)->latest()->where('active',true);
    }
}
