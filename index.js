const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

const listJson = fs.readFileSync('./koders.json');






app
    .get('/koders',(req,res) => {
        
           
                res.write(listJson);
           
            
        res.end();
    })
    .listen(port, ()=>{
        console.log(`Servidor escuchando en el puerto ${port}`);
    })