import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa-local',
  templateUrl: './mapa-local.component.html',
  styleUrls: ['./mapa-local.component.css']
})
export class MapaLocalComponent implements OnInit, OnDestroy {

  @Input() latlng!: string;
  @Input() nome!: string;
  mapa: any;

  constructor() { }

  ngOnInit(): void {
    this.renderizarMapa();
  }

  ngOnDestroy() {
    this.mapa.invalidateSize();
  }

  renderizarMapa() {
    const latlng = this.latlng.split(',').map(Number) as [number, number];
    this.mapa = L.map('mapa-local').setView(latlng, 15);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(this.mapa);
    L.marker(latlng).addTo(this.mapa).bindPopup(this.nome).openPopup();
    L.circle(latlng, {
        color: 'orange',
        fillColor: 'light-blue',
        fillOpacity: 0.35,
        radius: 100
    }).addTo(this.mapa);
  }

}
