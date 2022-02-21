const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;





app.use(express.json());



app
    .get('/koders', (req, res) => {
        const listJson = fs.readFileSync('./koders.json', 'utf-8');
        const kod = JSON.parse(listJson);

        res.json(kod);



    })
    .get('/koders/:id', (req, res) => {
        const idKoder = req.params.id;
        const listJson = fs.readFileSync('./koders.json', 'utf-8');
        const kod = JSON.parse(listJson);

        kod.koders.forEach(el => {
            if (parseInt(idKoder) === el.id) {
                res.json(el)
            }
        });
        
    })
    .post('/koders', (req, res) => {
        const listJson = fs.readFileSync('./koders.json', 'utf-8');
        const kod = JSON.parse(listJson);
        const body = req.body;
        body.id = kod.koders.length+1

        let koder = kod.koders
        koder.push(body);

        fs.writeFileSync('./koders.json', JSON.stringify(kod, null, 2));



        res.json({success: true})
    })
    .patch('/koders/:id', async (req, res) => {
          
          const idKoder = req.params.id;
          const nameKoder = req.body.name;
          const content = await fs.promises.readFile('./koders.json');
          const json = JSON.parse(content);

        
          const newKoders = json.koders.map((koder, index)=>{
                if (koder.id === parseInt(idKoder)) {
                    koder.name = nameKoder
                }
                return koder
          })
          json.koders = newKoders;
          console.log(json);

          await fs.promises.writeFile('./koders.json', JSON.stringify(json, null, 2),'utf-8');
          res.json({
              success: true,
          })
    })
    .delete('/koders/:id', async (req, res) => {
          const idKoder = req.params.id;
          const content = await fs.promises.readFile('./koders.json');
          const json = JSON.parse(content);
          let index = 1;
          let newKoders = [];

          json.koders.forEach(el => {
              if (parseInt(idKoder) != el.id) {
                  el.id = index
                  newKoders.push(el)

                  index++;
              }
          });
          
          json.koders = newKoders;
          await fs.promises.writeFile('./koders.json', JSON.stringify(json,null, 2),'utf-8');
          res.json({success: true});
    })

    app.listen(port, () => {
        console.log(`Servidor escuchando en el puerto ${port}`);
    })


