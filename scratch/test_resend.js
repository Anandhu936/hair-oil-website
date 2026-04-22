const { Resend } = require('resend');
require('dotenv').config({ path: '.env.local' });

async function testResend() {
  const resend = new Resend(process.env.RESEND_API_KEY);
  console.log('Using API Key:', process.env.RESEND_API_KEY ? 'Present' : 'Missing');
  console.log('Sending to:', process.env.OWNER_EMAIL);

  try {
    const data = await resend.emails.send({
      from: 'GEETHIKA <onboarding@resend.dev>',
      to: process.env.OWNER_EMAIL,
      subject: 'Test Email from Local',
      html: '<strong>Success!</strong> If you see this, Resend is working.',
    });

    console.log('Resend Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Resend Error:', error);
  }
}

testResend();
