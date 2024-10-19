<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Operation extends Model
{
    use HasFactory;
    protected $fillable=['type','customer_id','apartment_id'];



    public function apartment()
    {
        return $this->belongsTo(Apartment::class);
    }
        public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
