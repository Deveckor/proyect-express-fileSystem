const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

const listJson = fs.readFileSync('./koders.json');
const koders = JSON.parse(listJson);

koders.koders.forEach(el =>{
    console.log(el.name);
})

app.use(express.json());

app
    .get('/koders',(req,res) => {
        
            koders.koders.forEach(el=>{
                res.write(JSON.stringify(el.name));
            })
            
        res.end();
    })
    .listen(port, ()=>{
        console.log(`Servidor escuchando en el puerto ${port}`);
    })