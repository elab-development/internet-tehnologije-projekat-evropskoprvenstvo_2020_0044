<?php

namespace App\Http\Controllers;

use App\Http\Resources\GrupaResurs;
use App\Models\Grupa;
use Illuminate\Http\Request;

class GrupaController extends ResponseController
{
    public function index()
    {
        $grupe = Grupa::all();
        return $this->success(GrupaResurs::collection($grupe));
    }

    public function show($id)
    {
        $grupa = Grupa::find($id);
        if (!$grupa) {
            return $this->error('Grupa nije pronađena');
        }
        return $this->success(new GrupaResurs($grupa));
    }

    public function store(Request $request)
    {
        $request->validate([
            'nazivGrupe' => 'required|string'
        ]);

        $grupa = new Grupa();
        $grupa->nazivGrupe = $request->nazivGrupe;
        $grupa->save();

        return $this->success(new GrupaResurs($grupa), 'Grupa uspešno kreirana');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nazivGrupe' => 'required|string'
        ]);

        $grupa = Grupa::find($id);
        if (!$grupa) {
            return $this->error('Grupa nije pronađena');
        }

        $grupa->nazivGrupe = $request->nazivGrupe;
        $grupa->save();

        return $this->success(new GrupaResurs($grupa), 'Grupa uspešno ažurirana');
    }

    public function destroy($id)
    {
        $grupa = Grupa::find($id);
        if (!$grupa) {
            return $this->error('Grupa nije pronađena');
        }

        $grupa->delete();

        return $this->success(null, 'Grupa uspešno obrisana');
    }
}
