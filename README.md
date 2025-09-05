# clinician-service-test
A security feature that will alert us within 5 minutes of a phlebotomist leaving the expected zone around a patient’s home. We want to make sure that all our phlebotomists are accounted for and safe at all times. This is just a test repo.

Running the Service
1. npm install
2. npm run start

This will run clinicians.ts polling. Every minute the list of clinicians will be polled and 
email alerts will be sent if a clinician leaves their defined boundaries. Clinician boundaries and locations are given by a demo api Sprinter provided.
