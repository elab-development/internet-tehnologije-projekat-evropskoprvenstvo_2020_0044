<?php

namespace App\Http\Controllers;

use App\Http\Resources\DrzavaResurs;
use App\Models\Drzava;
use Illuminate\Http\Request;

class DrzaveController extends ResponseController
{
    public function index()
    {
        $drzave = Drzava::all();
        return $this->success(DrzavaResurs::collection($drzave));
    }

    public function store(Request $request)
    {
        $request->validate([
            'nazivDrzave' => 'required|string|max:255',
            'grb' => 'required|string|max:255',
            'grupa_id' => 'required|integer',
        ]);

        $drzava = Drzava::create($request->all());
        return $this->success($drzava, 'Država uspešno kreirana.');
    }

    public function show($id)
    {
        $drzava = Drzava::find($id);
        if ($drzava) {
            return $this->success($drzava);
        } else {
            return $this->error('Država nije pronađena.', [], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $drzava = Drzava::find($id);
        if ($drzava) {
            $request->validate([
                'nazivDrzave' => 'required|string|max:255',
                'grb' => 'required|string|max:255',
                'grupa_id' => 'required|integer',
            ]);

            $drzava->update($request->all());
            return $this->success($drzava, 'Država uspešno ažurirana.');
        } else {
            return $this->error('Država nije pronađena.', [], 404);
        }
    }

    public function destroy($id)
    {
        $drzava = Drzava::find($id);
        if ($drzava) {
            $drzava->delete();
            return $this->success(null, 'Država uspešno obrisana.');
        } else {
            return $this->error('Država nije pronađena.', [], 404);
        }
    }
}
