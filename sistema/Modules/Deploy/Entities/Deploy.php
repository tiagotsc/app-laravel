<?php

namespace Modules\Deploy\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Deploy extends Model
{
    use HasFactory;

    protected $fillable = [
        'repository',
        'enveronment',
        'user_id',
        'action',
        'description',
        'status'
    ];
    
    protected static function newFactory()
    {
        return \Modules\Deploy\Database\factories\DeployFactory::new();
    }
}
