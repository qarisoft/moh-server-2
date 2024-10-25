<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Floor extends Model
{
    use HasFactory;


    protected $fillable=[
        'number',
        'apartment_count',
        'project_id'
    ];
    protected $gaurded = [];

    public function project():BelongsTo
    {
        return $this->belongsTo(Project::class);
    }



    public function apartments():HasMany
    {
        return $this->hasMany(Apartment::class);
    }


    protected static function booted()
    {
        static::created(function($floor){
//            $floor->number=Floor::query()->where('project_id',$floor->project_id)->count();
            $floor->number = $floor->project->floors()->count();
            $floor->save();
        });
    }
}
