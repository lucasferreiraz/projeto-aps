import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa-local',
  templateUrl: './mapa-local.component.html',
  styleUrls: ['./mapa-local.component.css']
})
export class MapaLocalComponent implements OnInit, OnDestroy, OnChanges {

  @Input() latlng!: string;
  @Input() nome!: string;
  @Input() corLinha: string = 'blue';
  mapa: any;
  roteador: any;

  constructor() { }

  ngOnInit(): void {
    this.renderizarMapa();
    this.adicionarMarcadorUsuario();
    this.mostrarRotaParaEstacionamento();
  }

  ngOnDestroy() {
    this.mapa.invalidateSize();
    if (this.roteador) {
      this.mapa.removeControl(this.roteador);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['corLinha']) {
      this.mostrarRotaParaEstacionamento();
    }
  }

  adicionarMarcadorUsuario() {
    const coordenadasUsuario: [number, number] = [-3.749742, -38.516059];

    const usuarioIcon = L.icon({
      iconUrl: 'assets/icons/marker-icon-red.png',
      shadowUrl: 'assets/icons/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    L.marker(coordenadasUsuario, { icon: usuarioIcon })
      .addTo(this.mapa)
  }

  mostrarRotaParaEstacionamento() {
    const coordenadasUsuario: [number, number] = [-3.749742, -38.516059];
    const destino: [number, number] = this.latlng.split(',').map(Number) as [number, number];

    if (this.roteador) {
      this.mapa.removeControl(this.roteador);
    }

    this.roteador = L.Routing.control({
      waypoints: [
        L.latLng(coordenadasUsuario),
        L.latLng(destino)
      ],
      routeWhileDragging: false,
      fitSelectedRoutes: false,
      show: false,
      lineOptions: {
        styles: [{ color: this.corLinha, opacity: 0.7, weight: 5 }],
        extendToWaypoints: true,
        missingRouteTolerance: 10,
      } as L.Routing.LineOptions,
      createMarker: () => null
    } as unknown as L.Routing.RoutingControlOptions).addTo(this.mapa);
  }

  mudarCorLinha() {
    this.corLinha = this.corLinha === 'blue' ? 'green' : 'blue';
    this.mostrarRotaParaEstacionamento();
  }

  renderizarMapa() {
    const latlng = this.latlng.split(',').map(Number) as [number, number];
    this.mapa = L.map('mapa-local').setView(latlng, 16);
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
