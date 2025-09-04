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
                        -122.2869300843,
                        37.5148320577
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
                        ],
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
export const getClinicianStatus = async (id: number): Promise<any> => { // I should type the return to the above instead of a Promise<any>

}
