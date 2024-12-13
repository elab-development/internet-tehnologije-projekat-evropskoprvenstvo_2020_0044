<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RezultatResurs extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserResurs($this->user),
            'tipRezultata' => new TipRezultataResurs($this->tip_rezultata),
            'domacin' => new DrzavaResurs($this->drzava_domacin),
            'gost' => new DrzavaResurs($this->drzava_gost),
            'golova_domacin' => $this->golova_domacin,
            'golova_gost' => $this->golova_gost,
            'datum_utakmice' => $this->datum_utakmice,
        ];
    }
}
