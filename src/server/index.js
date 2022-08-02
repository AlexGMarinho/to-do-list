const express = require('express');
const router = require('../routes/checklist.js');
require('../../config/database.js');

const app = express();
app.use(express.json());

app.use('/checklists', router);

app.listen(3000, () => {
    console.log(`Servidor esta ouvindo na porta 8080`);
});
