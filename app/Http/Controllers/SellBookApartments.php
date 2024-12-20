<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Models\Customer;
use App\Models\Project;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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


    public function delete(Media $image): RedirectResponse
    {
        try{

        $image->delete();
        }catch (Exception $exception){

    }
    return  redirect()->back();

    }

}
