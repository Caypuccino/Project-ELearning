// inisialisasi
<<<<<<< HEAD
require('dotenv').config();
const express = require('express');
const apiRoutes = require('./routes');
const database = require('./config/database');
const app = express();
const PORT = process.env.PORT || 3000;
=======
const express = require('express');
const apiRoutes = require('./routes');
const app = express();
const PORT = 3000;
>>>>>>> ac397e03f4a9300ee5ce23adcfb79a522ac33992

// middleware request body, jika diperlukan
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle seluruh request /api/* ke route API
app.use('/api', apiRoutes);

// event loop
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

export default app;
