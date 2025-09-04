// If this were a Prod APP, read from .env files instead.
const BASE_API_URL = "https://3qbqr98twd.execute-api.us-west-2.amazonaws.com/test"
const GET_CLINICIANS_URL = "/clinicianstatus/";

/*
    Get Clinicians API. Returns the geocoordinates of a clinician along with coordinates of their permitted polygon
    boundary.
    An example of a response below. Note: usually I won't put something like this in code comments but would put
    this in some internal JIRA or other doc.

    {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -122.3074436188,
                    37.5426718015
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            -122.30946064,
                            37.5482180883
                        ],
                        [
                            -122.3164558411,
                            37.5387585288
                        ],
                        [
                            -122.2977018357,
                            37.5388265875
                        ],
                        [
                            -122.30946064,
                            37.5482180883
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            -122.2871017457,
                            37.520005999
                        ],
                        [
                            -122.2921657563,
                            37.5125172836
                        ],
                        [
                            -122.2823810578,
                            37.5131300249
                        ],
                        [
                            -122.2871017457,
                            37.520005999
                        ]
                    ]
                ]
            }
        }
    ]
}
*/
export const getClinicianStatus = async (id: number): Promise<any> => {
    // I should type the return to the above instead of a Promise<any>
    const getClinicianStatusUrl = BASE_API_URL + GET_CLINICIANS_URL + id;
    try {
        const res = await fetch(getClinicianStatusUrl);
        const clinicianMeta = await res.json();
        if (!clinicianMeta) throw new Error('Expected FeatureCollection from API response but received undefined.');

        // type check clinicianMeta at runtime
        let features = clinicianMeta.features;
        if (!features) throw new Error('Expected Features in FeatureCollection but field is undefined.');
        // features first index is always a clinician's coordinate or 'point' type
        // The rest of the items should be type Polygon
        for (let i = 1; i < features.length; i++) {
            if (features[i].geometry.coordinates.length > 1) {
                // TODO instead of throwing error, send out an email alert
                throw new Error('We currently do not handle GeoJSON Polygons with interior rings, please redefine the permitted boundary with the exterior ring coordinates defined.');
            }
        }

        return clinicianMeta;
    } catch (err) {
        console.log('Error in getClinicianStatus: ', err);
    }

}
