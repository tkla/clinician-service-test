import { getClinicians } from "./api/dummy-apis";
import { getClinicianStatus } from "./api/getClinicians";
import { GeoPoint, Polygon, PolygonList } from "./types/clinicians-api-types";

const POLLING_INTERVAL_MS = 10000; // 1 minute polling

/*
    Check if a given clinician current coordinate is within bounds of the given polygon.
    TODO define some custom type for the polygon.

    We're going to keep it simple by checking if the clinician is within a bounding box sized to the polygons in bounds
    to simplify checking if the clinician is in the area. This is not entirely accurate, for example clinician 4 has a
    C shaped boundary and the center will be incorrectly considered a valid position due to the bounding box's shape.

    Ideally I would implement this using an external library like turf (https://www.npmjs.com/package/@turf/turf)
    for more accurate boundary checking compared to a bounding box.
*/
function isClinicianInBounds(currentPos: GeoPoint, bounds: PolygonList): boolean {
    console.log('Checking: ', currentPos);
    console.log('bounds: ', bounds);
    const currentLat = currentPos[0];
    const currentLong = currentPos[1];
    let isInBounds = false;

    // As long as x,y is within the bounds of any polygon than the clinician is in bounds.
    bounds.forEach((polygon: Polygon) => {
        let minLat = Infinity;
        let minLong = Infinity;
        let maxLat = -Infinity;
        let maxLong = -Infinity;

        polygon.forEach((geoPoint: GeoPoint) => {
            const lat = geoPoint[0];
            const long = geoPoint[1];

            minLat = Math.min(minLat, lat);
            minLong = Math.min(minLong, long);
            maxLat = Math.max(maxLat, lat);
            maxLong = Math.max(maxLong, long);
        });

        // console.log('minLat: ', minLat);
        // console.log('minLong: ', minLong);
        // console.log('maxLat: ', maxLat);
        // console.log('maxLong: ', maxLong);
        let withinLat = currentLat >= minLat && currentLat <= maxLat;
        let withinLong = currentLong >= minLong && currentLong <= maxLong;

        if (withinLat && withinLong) isInBounds = true;
    });

    return isInBounds;
}

/*
    Go through the clinician id list and use sprinter's API to get their current coordinates and their allowed boundaries.
    Check if they are in a valid place or not and alert if needed. 

    Can use promise.allSettled for concurrency but I want to add a simple rate limiter if I can later to limit the QPS
*/
async function monitorClinicians(ids: Array<number>): Promise<any> {
    try {
        const promises = ids.map(async id => {
            let clinicianData = await getClinicianStatus(id);

            if (!clinicianData || !clinicianData.features || clinicianData.features.length < 2) {
                return { id, isValid: false, data: clinicianData, error: 'Received undefined Clinician status' };
            }

            let currentPos: GeoPoint = clinicianData.features[0].geometry.coordinates;
            let bounds: PolygonList = clinicianData.features
                .filter((feature: any) => feature.geometry.type === 'Polygon')
                .map((feature: any) => feature.geometry.coordinates[0]);

            if (isClinicianInBounds(currentPos, bounds)) {
                console.log('Valid clinician coordinate: ', id);
                return { id, isValid: true, data: clinicianData };
            } else {
                // TODO add email alert
                console.log('Sending email alert. Clinician is not within permitted bounds.');
            }
        });
    } catch (err) {
        console.log('monitorClinicians Error: ', err);
    }
}

async function sendAlert(id: number) {
    const alertMessage = `Clinician ${id} has left their bounds.`

    // TODO send email
}

/*
    Begin the polling for each clinician IDs 1-7
*/
async function startMonitoring() {
    let clinicianIds = await getClinicians();
    console.log('Clinicians Found: ' + clinicianIds);
    console.log('== Begin Monitoring =');

    // Debug
    monitorClinicians(clinicianIds);
    // getClinicianStatus(2);
    // getClinicianStatus(1);

    // init polling 
    // setInterval(() => {
    //     monitorClinicians(clinicianIds);
    // }, POLLING_INTERVAL_MS);
}

startMonitoring();
