<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    // The table associated with the model (optional if the table name follows Laravel's convention)
    protected $table = 'students';

    // The attributes that are mass assignable
    protected $fillable = [
        'name',
        'registration_no',
        'contact',
    ];

    // Optionally, if you want to prevent the use of certain fields when filling the model, you can use $guarded
    // protected $guarded = [];

    // Optionally, if you want to disable timestamps
    // public $timestamps = false;
}
