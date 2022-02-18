const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

const listJson = fs.readFileSync('./koders.json');
const koders = JSON.parse(listJson);



app.use(express.json());

app
    .get('/koders',(req,res) => {
        
           
                res.write(JSON.stringify(koders));
           
            
        res.end();
    })
    .listen(port, ()=>{
        console.log(`Servidor escuchando en el puerto ${port}`);
    })