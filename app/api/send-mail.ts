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

    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: 'gdsubwqd@sharklasers.com',
        subject: "Clinician Out of Bounds",
        text: alertMessage,
    };

    try {
        console.log('Sending', mailOptions);
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
}
