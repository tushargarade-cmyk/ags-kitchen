// server.js
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.json());

// Twilio credentials (replace with your own)
const accountSid = 'US663a231c6458c24c8383962028598a15';
const authToken = '38182467b0a579afd98c0c90f55e7165';
const client = twilio(accountSid, authToken);

// Owner WhatsApp number
const ownerNumber = 'whatsapp:+919665130574';

// Example Google Review link (replace with your business link)
const googleReviewLink = 'https://g.page/r/YOUR_GOOGLE_REVIEW_LINK';

app.post('/order', async (req, res) => {
  const { customerName, items, total, customerNumber } = req.body;

  // 1. Notify Owner
  await client.messages.create({
    from: 'whatsapp:+14155238886', // Twilio sandbox number
    to: ownerNumber,
    body: `New Order from ${customerName}\nItems: ${items.join(', ')}\nTotal: ₹${total}`
  });

  // 2. Thank Customer + Review Link
  await client.messages.create({
    from: 'whatsapp:+14155238886',
    to: `whatsapp:${customerNumber}`,
    body: `Thank you ${customerName} for ordering from AG's Kitchen! 🙏 
Your food has been delivered. 
We’d love your feedback: ${googleReviewLink}`
  });

  res.json({ message: 'Order processed and notifications sent!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
