import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoLocal, Local } from 'src/app/core/model';

@Component({
  selector: 'app-info-local',
  templateUrl: './info-local.component.html',
  styleUrls: ['./info-local.component.css']
})
export class InfoLocalComponent implements OnInit {

  infoLocal!: InfoLocal;
  stars = 4.5;

  locais: Local[] = [
    { lat: -3.7403433, lng: -38.530471, nome: 'Estacionamento 1' },
    { lat: -3.7402966, lng: -38.511470, nome: 'Estacionamento 2' },
    { lat: -3.7544696, lng: -38.516008, nome: 'Estacionamento 3' },
    { lat: -3.7579200, lng: -38.530810, nome: 'Estacionamento 4' },
    { lat: -3.7567951, lng: -38.509856, nome: 'Estacionamento 5' },
    { lat: -3.7410435, lng: -38.502276, nome: 'Estacionamento 6' },
    { lat: -3.7463841, lng: -38.526990, nome: 'Estacionamento 7' },
    { lat: -3.7442636, lng: -38.531634, nome: 'Estacionamento 8' },
    { lat: -3.7468554, lng: -38.515420, nome: 'Estacionamento 9' },
    { lat: -3.7474051, lng: -38.507392, nome: 'Estacionamento 10' },
    { lat: -3.7510965, lng: -38.509911, nome: 'Estacionamento 11' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const latlng = this.route.snapshot.paramMap.get('latlng');
    this.obterInfoLocal(latlng);
  }

  obterInfoLocal(latlng) {
    let lat, lng;
    [lat, lng] = latlng.split(',').map(Number) as [number, number];

    const local = this.locais.find(local =>
      (local.lat === lat && local.lng === lng));

    this.infoLocal = new InfoLocal(`${lat},${lng}`, local!.nome)
  }

  voltar() {
    this.router.navigate(['/mapas']);
  }

}
