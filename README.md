# clinician-service-test
A security feature that will alert us within 5 minutes of a phlebotomist leaving the expected zone around a patient’s home. We want to make sure that all our phlebotomists are accounted for and safe at all times. This is just a test repo.

Prerequisites (Optional if you want to send out real emails)
- Sign up for a SendGrid account
- Create and store a SendGrid API key with full access "Mail Send" permissions.
- Verify your Sender Identity

Optional env vars
BASE_API_URL="https://your-api-url.com/test"
GET_CLINICIANS_URL="/clinicianstatus/"
SPRINTER_EMAIL="yourTargetEmail@fake.com"

Required env vars
SENDGRID_API_KEY="your_sendgrid_apikey"
SENDER_EMAIL="your_sendgrid_verified_email@fake.com"

Running the Service
1. npm install
2. npm run start

This will run clinicians.ts polling. Every minute the list of clinicians will be polled and 
email alerts will be sent if a clinician leaves their defined boundaries. Clinician boundaries and locations are given by a demo api Sprinter provided.
