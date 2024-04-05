const express = require("express");
const app = express()
const db = require("./src/db")
const routes = require('./src/routes')


app.use(express.json());
app.use('/api', routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));

