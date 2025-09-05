import nodemailer from 'nodemailer';

export async function sendAlert(id: number, message?: string) {
    const alertMessage = (message ? message : `Unknown Alert triggered for Clinician ${id}`);

    const transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_API_KEY
        }
    });

    const now: Date = new Date();
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: process.env.SPRINTER_EMAIL,
        subject: `Kenny La Sprinter Health Programming Challenge - Clinician ${id} Out of Bounds`,
        text: now.toString() + '\n' + alertMessage,
    };

    try {
        console.log('Sending', mailOptions);
        let sendEmailData = await transporter.sendMail(mailOptions);
        console.log('Email successfully sent status: ' + sendEmailData.response);
    } catch (error) {
        console.error('nodemailer encountered an error attempting to send email:', error);
    }
}
