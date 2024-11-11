<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Apartment;
use App\Models\Customer;
use App\Models\Floor;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

//use http\Env\Request;

//use Pest\ArchPresets\Custom;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Projects/Index', [
            'data' => fn() => Project::query()->orderBy('id', 'desc')
                ->withCount('floors')
                ->withCount('apartments')
                ->paginate(perPage: 20)
        ]);
    }

    public function store(StoreProjectRequest $request)
    {
        $request->validated();
        $project = Project::create([
            'name' => $request->name,
            'description' => $request->description
        ]);

        foreach ($request->items as $item) {
            Floor::factory()->count($item['floor'])
                ->has(Apartment::factory()->count($item['apartments']))
                ->create(['project_id' => $project->id]);
        }
    }

    public function create()
    {
        //
    }

    public function addFloorWithApartments(Project $project, Request $request)
    {
        $request->validate(['items' => 'array']);
        foreach ($request->items as $item) {
            Floor::factory()->count($item['floor'])
                ->has(Apartment::factory()->count($item['apartments']))
                ->create(['project_id' => $project->id]);
        }
    }

    public function show(Project $project)
    {
        // $p = Project::query->where( 'id',$project->id)->->with('floors')->with('apartments')
        return Inertia::render('Projects/Show', [
            'project' => [
                'id' => $project->id,
                'name' => $project->name,
                'floors' =>
                $project->floors()->with('apartments')->get()
        ,
                'apartments' => $project->apartments,
                'created_at' => $project->created_at,
                'updated_at' => $project->updated_at,
                'media'=>$project->media()->orderBy('created_at', 'desc')->get()
            ]   ,
            'media'=>
            $project->getMedia()->toArray(),
            'customers' => Customer::all()
        ]);
    }

    public function edit(Project $project)
    {
        //
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    public function destroy(Project $project)
    {
        $project->clearMediaCollection();
        $project->delete();
        return redirect()->back();
    }


}
