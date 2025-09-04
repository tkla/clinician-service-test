import { getClinicians } from "./api/dummy-apis";
import { getClinicianStatus } from "./api/getClinicians";
import { GeoPoint, PolygonList } from "./types/clinicians-api-types";

const POLLING_INTERVAL_MS = 10000; // 1 minute polling

/*
    Check if a given clinician current coordinate is within bounds of the given polygon.
    TODO define some custom type for the polygon.
*/
function isClinicianInBounds(currentPos: GeoPoint, bounds: PolygonList): boolean {
    console.log('Checking: ', currentPos);
    console.log('bounds: ', bounds);

    return true;
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
            console.log('Polling ', id);

            if (!clinicianData || !clinicianData.features || clinicianData.features.length < 2) {
                return { id, isValid: false, data: clinicianData, error: 'Received undefined Clinician status' };
            }

            let currentPos: GeoPoint = clinicianData.features[0].geometry.coordinates;
            let bounds = clinicianData.features
                .filter((feature: any) => feature.geometry.type === 'Polygon')
                .map((feature: any) => feature.geometry.coordinates[0]);

            if (isClinicianInBounds(currentPos, bounds)) {
                console.log('Valid clinician coordinate');
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
    // monitorClinicians(clinicianIds);
    // getClinicianStatus(2);
    // getClinicianStatus(1);

    // init polling 
    setInterval(() => {
        monitorClinicians(clinicianIds);
    }, POLLING_INTERVAL_MS);
}

startMonitoring();
