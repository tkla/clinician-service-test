export type GeoPoint = [number, number];
export type Polygon = GeoPoint[];
export type PolygonList = [Polygon];

export interface FeaturePolygon {
    type: 'Feature',
    properties: {},
    geometry: {
        type: 'Polygon',
        coordinates: [Polygon],
    }
}
