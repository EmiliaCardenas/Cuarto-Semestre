const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.static('views'));
app.use(express.json());

// Obtener token de acceso
async function getAccessToken() {
  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64');
  const response = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', 
    'grant_type=client_credentials',
    {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return response.data.access_token;
}

// Crear orden de pago
app.post('/crear-orden', async (req, res) => {
  const token = await getAccessToken();
  const response = await axios.post('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: '10.00'
      }
    }]
  }, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  res.json(response.data);
});

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
