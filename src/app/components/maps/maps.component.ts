import { Component, HostListener, OnInit, inject } from '@angular/core';
import { GoogleMap, MapPolygon } from '@angular/google-maps';
import { GeoLocationService } from '../../services/geo-location.service';
import { BeachInfo, BeachObject, Illa } from '../../types/platja';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [GoogleMap, MapPolygon, CommonModule],
  template: `
    <div class="container">
      <google-map
        [options]="options"
        class="maps"
        [height]="mapSize.height"
        [width]="mapSize.width"
      >
        @for (beach of beaches; track $index) {
        <map-polygon
          [paths]="beach.coordinates"
          [options]="beach.options"
          (polygonMouseover)="setLabel($event, beach)"
          (polygonMouseout)="beachInfo.display = false"
        />
        } @if (beachInfo.display) {
        <div
          class="beach-info"
          [ngStyle]="{ top: beachInfo.x + 'px', left: beachInfo.y + 'px' }"
        >
          <h4>{{ beachInfo.name }}</h4>
          <p>{{ beachInfo.location }}</p>
          <p>{{ beachInfo.area }} m2</p>
          <p>{{ beachInfo.island }}</p>
        </div>
        }
      </google-map>
    </div>
  `,
  styles: `
    .container {
      display: flex;
      justify-content: center;

    }
    .beach-info {
      position: absolute;
      color: black;
      background-color: white;
      padding: 5px 10px;
      border-radius: 5px;
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
      z-index: 999;
    }
  `,
})
export class MapsComponent implements OnInit {
  geoLocationService = inject(GeoLocationService);
  beaches: BeachObject[] = [];
  beachInfo: BeachInfo = {
    display: false,
    name: '',
    location: '',
    area: 0,
    island: Illa.Mallorca,
    x: 0,
    y: 0,
  };

  options: google.maps.MapOptions = {
    // Set Mallorca as the center of the map
    center: { lat: 39.695263, lng: 3.017571 },
    zoom: 8,
  };

  mapSize = {
    width: '800px',
    height: '400px',
  };

  polygonDefaultOptions: google.maps.PolygonOptions = {
    fillOpacity: 0.5,
    strokeWeight: 2,
  };

  ngOnInit(): void {
    this.getPlatges();
    this.onResize({ target: window });
  }

  // window size listener
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    let width = event.target.innerWidth;
    if (width > 800) width = 800;
    this.mapSize.width = width - 100 + 'px';
    this.mapSize.height = width / 2 + 'px';
  }

  getPlatges(): void {
    this.geoLocationService.fetchPlatgesCales().subscribe((platges) => {
      const beaches: BeachObject[] = [];
      platges.forEach((platja) => {
        const color = this.randomColor;
        let beach: BeachObject = {
          name: platja.nom,
          name_2: platja.nom_2,
          area: parseFloat(platja.shape_area),
          island: platja.illa,
          location: platja.municipi,
          coordinates: [],
          options: {
            ...this.polygonDefaultOptions,
            fillColor: color,
            strokeColor: color,
          },
        };
        const coordinates = platja.the_geom.coordinates.flat(2);
        beach.coordinates = coordinates.map((coord) => {
          return { lat: coord[1], lng: coord[0] };
        });
        beaches.push(beach);
      });
      this.beaches = beaches;
    });
  }

  setLabel(event: any, beach: BeachObject): void {
    const domEvent = event.domEvent as MouseEvent;
    this.beachInfo = {
      display: true,
      name: beach.name,
      location: beach.location,
      area: beach.area,
      island: beach.island,
      // set x and y to the mouse position
      x: domEvent.clientY,
      y: domEvent.clientX,
    };
  }

  // generate random color
  get randomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}
