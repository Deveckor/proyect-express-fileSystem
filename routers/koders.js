const express = require('express');
const fs = require('fs');


const router = express.Router();



async function getKoders() {
    const listJson = fs.readFileSync('./kodemia.json', 'utf-8');
        const json = JSON.parse(listJson);
        return json;
}


router
    .get('/', async (req, res) => {
        console.log('query params', req.query);
        const count = req.query.count;
        const gender = req.query.gender;
        const gen = req.query.gen;
        const json =await getKoders();
        
        let kodersData = json.koders;
        
        if (gender) {
            
            kodersData = kodersData.filter(koders => koders.gender === gender);
        }
        if (gen) {
            
            kodersData = kodersData.filter(koders => koders.generation === parseInt(gen));
        }
        
        if (count) {
            
            kodersData = kodersData.slice(0, parseInt(count))
        } 
        
            
            res.json({ koders: kodersData });
            
        



    })
    .get('/:id', async (req, res) => {
        const idKoder = req.params.id;
        
        const json = await getKoders();

        const findKoder = json.koders.find((koder) => koder.id === parseInt(idKoder))
        

        if (!findKoder) {
            res.status(400)
            res.json({
                success: false,
                message: 'koder not found'
            })
            return
        }
        res.json({
            success: true,
            findKoder
        })
    })
    .post('/', (req, res) => {
        const listJson = fs.readFileSync('./kodemia.json', 'utf-8');
        const kod = JSON.parse(listJson);
        const body = req.body;
        body.id = kod.koders.length + 1

        let koder = kod.koders
        koder.push(body);

        fs.writeFileSync('./kodemia.json', JSON.stringify(kod, null, 2));



        res.json({ success: true })
    })
    .patch('/:id', async (req, res) => {

        const idKoder = req.params.id;
        const nameKoder = req.body.name;
        const content = await fs.promises.readFile('./kodemia.json');
        const json = JSON.parse(content);


        const newKoders = json.koders.map((koder, index) => {
            if (koder.id === parseInt(idKoder)) {
                koder.name = nameKoder
            }
            return koder
        })
        json.koders = newKoders;
        console.log(json);

        await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf-8');
        res.json({
            success: true,
        })
    })
    .delete('/:id', async (req, res) => {
        const idKoder = req.params.id;
        const content = await fs.promises.readFile('./kodemia.json');
        const json = JSON.parse(content);
        
        const kodersFiltered = json.koders.filter((koder)=> koder.id !== parseInt(idKoder))
        
        json.koders = kodersFiltered;

        await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf-8');

        res.json(
            { success: true}
        )
    })

    module.exports = router;