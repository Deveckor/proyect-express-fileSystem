const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;
const koderRouter = require('./routers/koders')
const mentorRouter = require('./routers/mentores')


app.use(express.json());

app.use('/koders',koderRouter);
app.use('/mentors', mentorRouter);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
})


