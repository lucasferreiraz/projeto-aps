import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { Local } from 'src/app/core/model';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit, OnDestroy {

  mapa: any;

  locais: Local[] = [
    { lat: -3.7403433, lng: -38.530471, nome: 'Estacionamento 1' },
    { lat: -3.7402966, lng: -38.511470, nome: 'Estacionamento 2' },
    { lat: -3.7544696, lng: -38.516008, nome: 'Estacionamento 3' },
    { lat: -3.7579200, lng: -38.530810, nome: 'Estacionamento 4' },
    { lat: -3.7567951, lng: -38.509856, nome: 'Estacionamento 6' },
    { lat: -3.7410435, lng: -38.502276, nome: 'Estacionamento 7' },
    { lat: -3.7463841, lng: -38.526990, nome: 'Estacionamento 8' },
    { lat: -3.7442636, lng: -38.531634, nome: 'Estacionamento 9' },
    { lat: -3.7468554, lng: -38.515420, nome: 'Estacionamento 10' },
    { lat: -3.7474051, lng: -38.507392, nome: 'Estacionamento 11' },
    { lat: -3.7510965, lng: -38.509911, nome: 'Estacionamento 12' },
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mapa = L.map('mapa').setView([-3.744681, -38.523376], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.mapa);

    this.adicionarMarkers()
  }

  adicionarMarkers() {
    const markers: any = [];
    this.locais.forEach(local => markers.push(L.marker([local.lat, local.lng]).addTo(this.mapa)));
    markers.forEach(marker => marker.on('click',
      (e) => this.onMarkerClick(e, this.locais))
    );
  }

  onMarkerClick(e: any, locais: Local[]) {
    const local = locais.find(local =>
        (local.lat === e.latlng.lat && local.lng === e.latlng.lng));
    this.router.navigate([`/mapas/info-local/${local?.lat},${local?.lng}`]);
  }

  ngOnDestroy() {
    this.mapa.invalidateSize();
  }

}
