const express = require('express');
const path = require('path');
const router = require('../routes/checklist.js');
const rootRouter = require('../routes');

require('../../config/database');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../../public')));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use('/', rootRouter);
app.use('/checklists', router);

app.listen(3000, () => {
    console.log(`Servidor esta ouvindo na porta 8080`);
});
