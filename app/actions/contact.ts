'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: {
    name: string;
    email: string;
    message: string;
}) {
    try {
        const { name, email, message } = formData;

        // Send email to business
        await resend.emails.send({
            from: 'Filpack Online <onboarding@resend.dev>',
            to: ['melih@filpackusa.com'],
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p><small>Reply to: ${email}</small></p>
            `,
        });

        // Send confirmation email to customer
        await resend.emails.send({
            from: 'Filpack Online <onboarding@resend.dev>',
            to: [email],
            subject: 'Thank you for contacting Filpack Online',
            html: `
                <h2>Thank you for your message!</h2>
                <p>Dear ${name},</p>
                <p>We have received your message and will get back to you as soon as possible.</p>
                <p><strong>Your message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p>Best regards,<br>Filpack Online Team</p>
                <p><small>200K ST NE 1012 Washington DC 20002</small></p>
            `,
        });

        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('Failed to send contact email:', error);
        return { success: false, message: 'Failed to send email' };
    }
}
