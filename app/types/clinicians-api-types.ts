export type GeoPoint = [number, number];
export type Polygon = GeoPoint[];
export type PolygonList = Polygon[];

export interface Coordinates {
  coordinates: PolygonList;
}
