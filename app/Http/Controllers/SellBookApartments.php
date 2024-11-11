<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Models\Customer;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class SellBookApartments extends Controller
{
    function sell(Apartment $apartment, Request $request)
    {

        if ($request->create_customer == '1') {
            $request->validate([
                'name' => 'required|string',
                'phone' => 'required|string',
                'address' => 'required|string',
                'apartment_id' => 'required|int',
            ]);
            $customer = Customer::create([
                'name' => $request->name,
                'address' => $request->address,
                'phone' => $request->phone,
            ]);
            $apartment = Apartment::find($request->apartment_id);
            $apartment->sell($customer->id);
        } else {
            $request->validate([
                'customer_id' => 'required|string',
                'apartment_id' => 'required|int',
            ]);
            $apartment = Apartment::find($request->apartment_id);
            $apartment->sell($request->customer_id);
        }
    }

    function book(Request $request)
    {
        if ($request->create_customer == '1') {
            $request->validate([
                'name' => 'required|string',
                'phone' => 'required|string',
                'address' => 'required|string',
                'apartment_id' => 'required|int',
            ]);
            $customer = Customer::create([
                'name' => $request->name,
                'address' => $request->address,
                'phone' => $request->phone,
            ]);
            $apartment = Apartment::find($request->apartment_id);
            $apartment->book($customer->id);
        } else {
            $request->validate([
                'customer_id' => 'required|string',
                'apartment_id' => 'required|int',
            ]);
            $apartment = Apartment::find($request->apartment_id);
            $apartment->book($request->customer_id);
        }

    }

    function cancel(Apartment $apartment, Request $request)
    {
        $request->validate([
            'apartment_id' => 'required|int',
        ]);
        $apartment = Apartment::find($request->apartment_id);

        $apartment->cancel();
    }


    public function upload(Request $request, Project $project)
    {
        $request->validate([
            'photo' => 'required',
            'project_id' => 'required|int'
        ]);

        $file = $request->file('photo');

        // dd()
        ini_set('memory_limit', '-1');
        $project->addMediaFromRequest('photo')->toMediaCollection();

    }

//    public function upload2(Request $request, Project $project)
//    {
//        try {
//
//        $project->addMediaFromUrl('https://drive.google.com/file/d/1KojNJ4XlAoVvSKCFE4zgQpxeKo4L4Bg_/view?usp=drive_link');
//        }catch (Exception $exception){
//
//        }
//    }

    public function delete(Media $image)
    {
        // $image->c

        $image->delete();
        return Redirect::back()->with('success', 'Contact created.');

    }

}
