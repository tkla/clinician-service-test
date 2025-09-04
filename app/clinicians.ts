import { getClinicians } from "./api/dummy-apis";
import { getClinicianStatus } from "./api/getClinicians";
import { GeoPoint, PolygonList } from "./types/clinicians-api-types";

/*
    Check if a given clinician current coordinate is within bounds of the given polygon.
    TODO define some custom type for the polygon.
*/
function isClinicianInBounds(currentPos: GeoPoint, bounds: PolygonList): boolean {
    return true;
}

/*
    Go through the clinician id list and use sprinter's API to get their current coordinates and their allowed boundaries.
    Check if they are in a valid place or not and alert if needed. 

    Can use promise.all for concurrency but I want to add a simple rate limiter if I can later to limit the QPS
*/
async function monitorClinicians(ids: Array<number>): Promise<any> {

}

async function sendAlert(id: number) {
    const alertMessage = `Clinician ${id} has left their bounds.`

    // TODO send email
}

/*
    We hardcode this by pretending to get the list of clinicians from some API or 
    internal DB
*/
async function pollClinicians(cliniciansIds: Array<number>) {
    // Iterate through list of clinicians id and wrap in a promise.all for concurrency?
    // Might need to add small and simple rate limiter just in case.

    // 1. Iterate through clinician IDs and run
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
}

startMonitoring();
