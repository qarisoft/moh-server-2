<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Apartment extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'number',
        'price',
        'rooms',
        'info'
    ];


    public function floor(): BelongsTo
    {
        return $this->belongsTo(Floor::class);
    }

    public function status(){
        if ($this->is_soled){
            return 'soled';
        }

    }

    public function sell( $customer_id): void
    {
        $this->operations()->create([
            'customer_id' => intval($customer_id),
            'type'=>'sell',
            'apartment_id'=>$this->id
        ]);
        $this->is_soled=true;
        $this->save();
    }

    public function cancel():void
    {
        $this->is_booked = false;
        $this->is_soled = false;
        $this->save();
    }
    public function book($customer): void
    {
        $this->operations()->create([
            'customer_id' => intval($customer),
            'type'=>'book',
            'apartment_id'=>$this->id
        ]);
        $this->is_booked=true;
        $this->save();
    }
    public function is_free():bool{
        if (($this->is_soled??false)){
            return false;
        }
        if (($this->is_booked??false)){
            return  false;
        }
        return true;
    }

    public function operations()
    {
        return $this->hasMany(Operation::class);
    }

    public function customer():BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    protected static function booted(): void
    {
        static::created(function (Apartment $apartment) {
            $apartment->number = Apartment::where('floor_id',$apartment->floor->id)->count();
            $apartment->save();
        });
    }
}
