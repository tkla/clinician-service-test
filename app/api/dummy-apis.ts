/*
    A set of fake APIs meant to represent calling in data from some DB
*/

function delay(ms: number = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getClinicians = async (): Promise<number[]> => {
    let clinicians: Array<number> = [];
    await delay();
    clinicians = [1]; // Hard coded values
    return clinicians;
};

