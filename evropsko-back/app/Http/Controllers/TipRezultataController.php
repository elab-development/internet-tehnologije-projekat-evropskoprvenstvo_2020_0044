<?php

namespace App\Http\Controllers;

use App\Models\TipRezultata;
use Illuminate\Http\Request;

class TipRezultataController extends ResponseController
{
    public function index()
    {
        $tipRezultata = TipRezultata::all();
        return $this->success($tipRezultata);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nazivTipa' => 'required|string|max:255',
        ]);

        $tipRezultata = new TipRezultata();
        $tipRezultata->nazivTipa = $request->nazivTipa;
        $tipRezultata->save();

        return $this->success($tipRezultata, 'Tip rezultata uspešno kreiran.');
    }

    public function show($id)
    {
        $tipRezultata = TipRezultata::find($id);
        if (!$tipRezultata) {
            return $this->error('Tip rezultata nije pronađen.', [], 404);
        }
        return $this->success($tipRezultata);
    }

    public function update(Request $request, $id)
    {
        $tipRezultata = TipRezultata::find($id);
        if (!$tipRezultata) {
            return $this->error('Tip rezultata nije pronađen.', [], 404);
        }

        $request->validate([
            'nazivTipa' => 'required|string|max:255',
        ]);

        $tipRezultata->nazivTipa = $request->nazivTipa;
        $tipRezultata->save();

        return $this->success($tipRezultata, 'Tip rezultata uspešno ažuriran.');
    }

    public function destroy($id)
    {
        $tipRezultata = TipRezultata::find($id);
        if (!$tipRezultata) {
            return $this->error('Tip rezultata nije pronađen.', [], 404);
        }

        $tipRezultata->delete();

        return $this->success($tipRezultata, 'Tip rezultata uspešno obrisan.');
    }
}
