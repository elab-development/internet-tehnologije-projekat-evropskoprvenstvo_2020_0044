<?php

namespace App\Http\Controllers;

use App\Http\Resources\RezultatResurs;
use App\Models\Rezultat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RezutatiController extends ResponseController
{
    public function index()
    {
        $rezultati = Rezultat::all();
        return $this->success(RezultatResurs::collection($rezultati), 'Svi rezultati.');
    }

    public function show($id)
    {
        $rezultat = Rezultat::find($id);
        if ($rezultat) {
            return $this->success(new RezultatResurs($rezultat), 'Rezultat pronađen.');
        } else {
            return $this->error('Rezultat nije pronađen.', [], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'drzava_domacin_id' => 'required|integer',
            'drzava_gost_id' => 'required|integer',
            'golova_domacin' => 'required|integer',
            'golova_gost' => 'required|integer',
            'tip_rezultata_id' => 'required|integer',
            'user_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return $this->error('Greska pri validaciji', $validator->errors(), 400);
        }

        $rezultat = new Rezultat();
        $rezultat->drzava_domacin_id = $request->drzava_domacin_id;
        $rezultat->drzava_gost_id = $request->drzava_gost_id;
        $rezultat->golova_domacin = $request->golova_domacin;
        $rezultat->golova_gost = $request->golova_gost;
        $rezultat->tip_rezultata_id = $request->tip_rezultata_id;
        $rezultat->user_id = $request->user_id;
        $rezultat->datum_utakmice = new \DateTime();
        $rezultat->save();

        return $this->success(new RezultatResurs($rezultat), 'Rezultat uspešno kreiran.');
    }

    public function update(Request $request, $id)
    {
        $rezultat = Rezultat::find($id);
        if ($rezultat) {
            $validator = Validator::make($request->all(), [
                'drzava_domacin_id' => 'required|integer',
                'drzava_gost_id' => 'required|integer',
                'golova_domacin' => 'required|integer',
                'golova_gost' => 'required|integer',
                'tip_rezultata_id' => 'required|integer',
                'user_id' => 'required|integer',
                'datum_utakmice' => 'required|date',
            ]);

            if ($validator->fails()) {
                return $this->error('Greska pri validaciji', $validator->errors(), 400);
            }

            $rezultat->drzava_domacin_id = $request->drzava_domacin_id;
            $rezultat->drzava_gost_id = $request->drzava_gost_id;
            $rezultat->golova_domacin = $request->golova_domacin;
            $rezultat->golova_gost = $request->golova_gost;
            $rezultat->tip_rezultata_id = $request->tip_rezultata_id;
            $rezultat->user_id = $request->user_id;
            $rezultat->datum_utakmice = $request->datum_utakmice;
            $rezultat->save();

            return $this->success(new RezultatResurs($rezultat), 'Rezultat uspešno ažuriran.');
        } else {
            return $this->error('Rezultat nije pronađen.', [], 404);
        }
    }

    public function destroy($id)
    {
        $rezultat = Rezultat::find($id);
        if ($rezultat) {
            $rezultat->delete();
            return $this->success(null, 'Rezultat uspešno obrisan.');
        } else {
            return $this->error('Rezultat nije pronađen.', [], 404);
        }
    }

    public function tabela(Request $request)
    {
        $rezultati = Rezultat::where('tip_rezultata_id', '=', 1)->get();

        $tabela = [];

        foreach ($rezultati as $rezultat) {
            if (!isset($tabela[$rezultat->drzava_domacin_id])) {
                $tabela[$rezultat->drzava_domacin_id] = [
                    'drzava' => $rezultat->drzava_domacin->nazivDrzave,
                    'grupa' => $rezultat->drzava_domacin->grupa->nazivGrupe,
                    'odigranih' => 0,
                    'pobeda' => 0,
                    'nereseno' => 0,
                    'poraza' => 0,
                    'golova' => 0,
                    'primljenih' => 0,
                    'golRazlika' => 0,
                    'bodova' => 0,
                ];
            }

            if (!isset($tabela[$rezultat->drzava_gost_id])) {
                $tabela[$rezultat->drzava_gost_id] = [
                    'drzava' => $rezultat->drzava_gost->nazivDrzave,
                    'grupa' => $rezultat->drzava_gost->grupa->nazivGrupe,
                    'odigranih' => 0,
                    'pobeda' => 0,
                    'nereseno' => 0,
                    'poraza' => 0,
                    'golova' => 0,
                    'primljenih' => 0,
                    'golRazlika' => 0,
                    'bodova' => 0,
                ];
            }

            $golovaDomacin = (int) $rezultat->golova_domacin;
            $golovaGost = (int) $rezultat->golova_gost;

            $tabela[$rezultat->drzava_domacin_id]['odigranih']++;
            $tabela[$rezultat->drzava_gost_id]['odigranih']++;

            $tabela[$rezultat->drzava_domacin_id]['golova'] += $golovaDomacin;
            $tabela[$rezultat->drzava_domacin_id]['primljenih'] += $golovaGost;
            $tabela[$rezultat->drzava_domacin_id]['golRazlika'] += $golovaDomacin - $golovaGost;

            $tabela[$rezultat->drzava_gost_id]['golova'] += $golovaGost;
            $tabela[$rezultat->drzava_gost_id]['primljenih'] += $golovaDomacin;
            $tabela[$rezultat->drzava_gost_id]['golRazlika'] += $golovaGost - $golovaDomacin;

            if ($rezultat->golova_domacin > $rezultat->golova_gost) {
                $tabela[$rezultat->drzava_domacin_id]['pobeda']++;
                $tabela[$rezultat->drzava_domacin_id]['bodova'] += 3;

                $tabela[$rezultat->drzava_gost_id]['poraza']++;
            } elseif ($rezultat->golova_domacin < $rezultat->golova_gost) {
                $tabela[$rezultat->drzava_gost_id]['pobeda']++;
                $tabela[$rezultat->drzava_gost_id]['bodova'] += 3;

                $tabela[$rezultat->drzava_domacin_id]['poraza']++;
            } else {
                $tabela[$rezultat->drzava_domacin_id]['nereseno']++;
                $tabela[$rezultat->drzava_domacin_id]['bodova']++;

                $tabela[$rezultat->drzava_gost_id]['nereseno']++;
                $tabela[$rezultat->drzava_gost_id]['bodova']++;
            }
        }


        usort($tabela, function ($a, $b) {
            if ($a['bodova'] == $b['bodova']) {
                if ($a['golRazlika'] == $b['golRazlika']) {
                    return $a['golova'] < $b['golova'];
                }
                return $a['golRazlika'] < $b['golRazlika'];
            }
            return $a['bodova'] < $b['bodova'];
        });

        return $this->success($tabela, 'Tabela uspešno kreirana.');
    }

    public function pretragaPoTipuRezultata($id)
    {
        $rezultati = Rezultat::where('tip_rezultata_id', '=', $id)->get();
        return $this->success(RezultatResurs::collection($rezultati), 'Rezultati po tipu rezultata.');
    }

    public function paginacija(Request $request)
    {
        $per_page = $request->per_page ?? 10;

        $rezultati = Rezultat::paginate($per_page);

        return $this->success($rezultati, 'Rezultati po stranici.');
    }


    public function grafik(Request $request)
    {
        $rezultati = Rezultat::all();

        $tabela = [];

        foreach ($rezultati as $rezultat) {
            if (!isset($tabela[$rezultat->drzava_domacin_id])) {
                $tabela[$rezultat->drzava_domacin_id] = [
                    'drzava' => $rezultat->drzava_domacin->nazivDrzave,
                    'golova' => 0,
                ];
            }

            if (!isset($tabela[$rezultat->drzava_gost_id])) {
                $tabela[$rezultat->drzava_gost_id] = [
                    'drzava' => $rezultat->drzava_gost->nazivDrzave,
                    'golova' => 0,
                ];
            }

            $golovaDomacin = (int) $rezultat->golova_domacin;
            $golovaGost = (int) $rezultat->golova_gost;


            $tabela[$rezultat->drzava_domacin_id]['golova'] += $golovaDomacin;

            $tabela[$rezultat->drzava_gost_id]['golova'] += $golovaGost;
        }

        return $this->success(array_values($tabela), 'Podaci za grafik.');
    }
}
