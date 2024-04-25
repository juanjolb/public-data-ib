export interface Platja {
  the_geom: TheGeom;
  objectid: string;
  nom: string;
  municipi: string;
  ine_mun: string;
  illa: Illa;
  id: string;
  shape_area: string;
  shape_len: string;
  nom_2?: string;
  nom_3?: string;
}

export enum Illa {
  Eivissa = 'Eivissa',
  Formentera = 'Formentera',
  Mallorca = 'Mallorca',
  Menorca = 'Menorca',
}

export interface TheGeom {
  type: Type;
  coordinates: Array<Array<Array<number[]>>>;
}

export interface BeachObject {
  name: string;
  name_2?: string;
  area: number;
  island: Illa;
  location: string;
  coordinates: google.maps.LatLngLiteral[];
  options: google.maps.PolygonOptions;
}

export interface BeachInfo {
  display: boolean;
  name: string;
  location: string;
  area: number;
  island: Illa;
  x: number;
  y: number;
}

export enum Type {
  MultiPolygon = 'MultiPolygon',
}
