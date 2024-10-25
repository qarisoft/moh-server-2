<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Customer;
use Inertia\Inertia;
//use Pest\ArchPresets\Custom;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Projects/Index',[
            'data'=>fn()=>Project::query()->orderBy('id','desc')
            ->withCount('floors')
            ->withCount('apartments')
            ->paginate(perPage: 20)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $request->validated();
        $project = Project::create([
            'name'=>$request->name,
            'description'=>$request->description
        ]);
//        dd($project);
        foreach ($request->items as $item) {
            for ($i = 0; $i < $item['floor']; $i++) {
                $f=$project->floors()->create();
                for ($i = 0; $i < $item['apartments']; $i++){
                    $f->apartments()->create();
                }

            }
        }
//        dd($request->items);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        // $p = Project::query->where( 'id',$project->id)->->with('floors')->with('apartments')
        return Inertia::render('Projects/Show',[
            'project'=>[
                'id'=>$project->id,
                'name'=>$project->name,
                'floors'=>$project->floors()->with('apartments')->get(),
                'apartments'=>$project->apartments,
                'created_at'=>$project->created_at,
                'updated_at'=>$project->updated_at,
                'media'=>$project->
                media()->orderBy('created_at','desc')->where('collection_name','default')->get()
            ],
            'customers'=>Customer::all()
            // ->with('floors')->with('apartments')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
