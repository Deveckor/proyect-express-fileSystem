const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

const listJson = fs.readFileSync('./koders.json','utf-8');
const koders = JSON.parse(listJson);



app.use(express.json());



app
    .get('/koders',(req,res) => {
        
           
               res.json(koders);
           
            
        
    })
    .post('/koders',(req,res) => {
        const body = req.body;
        
        
        fs.readFile('./koders.json',(err, data) => {
            if (err) {
                return console.log(err);
            }
            let koders = JSON.parse(data);
            let koder = koders.koders
            koder.push(body);
            
            
            fs.writeFile('./koders.json',JSON.stringify(koders), (err) =>{
                if (err) {
                    return console.log(err)
                }
            })
        })
        res.end()
    })
    .listen(port, ()=>{
        console.log(`Servidor escuchando en el puerto ${port}`);
    })


