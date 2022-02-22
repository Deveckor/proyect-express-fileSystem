const express = require('express');
const fs = require('fs');


const router = express.Router();



async function getKodemia() {
    const listJson = fs.readFileSync('./kodemia.json', 'utf-8');
        const json = JSON.parse(listJson);
        return json;
        
}



router
    .get('/', async (req, res) => {
        const count = req.query.count;
        const gender = req.query.gender;
        const module = req.query.mod;
        const json =await getKodemia();
        
        let mentorData = json.mentors;
        console.log(mentorData);
        if (gender) {
            
            mentorData = mentorData.filter(mentors => mentors.gender === gender);
        }
        if (module) {
            
            mentorData = mentorData.filter(mentors => mentors.module === module);
        }
        
        if (count) {
            
            mentorData = mentorData.slice(0, parseInt(count))
        } 
        
            
            res.json({ mentors: mentorData });
            
        


    })
    .get('/:id', async (req, res) => {
        const idMentors = req.params.id;
        
        const json = await getKodemia();

        const findMentor = json.mentors.find((mentors) => mentors.id === parseInt(idMentors))
        

        if (!findMentor) {
            res.status(400)
            res.json({
                success: false,
                message: 'mentor not found'
            })
            return
        }
        res.json({
            success: true,
            findMentor
        })
    })
    .post('/', (req, res) => {
        const listJson = fs.readFileSync('./kodemia.json', 'utf-8');
        const kod = JSON.parse(listJson);
        const body = req.body;
        body.id = kod.mentors.length + 1

        let mentor = kod.mentors
        mentor.push(body);

        fs.writeFileSync('./kodemia.json', JSON.stringify(kod, null, 2));



        res.json({ success: true })
    })
    .patch('/:id', async (req, res) => {

        const idMentor = req.params.id;
        const nameMentor = req.body.name;
        const content = await fs.promises.readFile('./kodemia.json');
        const json = JSON.parse(content);


        const newMentor = json.mentors.map((mentor, index) => {
            if (mentor.id === parseInt(idMentor)) {
                mentor.name = nameMentor
            }
            return mentor
        })
        json.mentors = newMentor;
        
        await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf-8');
        res.json({
            success: true,
        })
    })
    .delete('/:id', async (req, res) => {
        const idMentor = req.params.id;
        const content = await fs.promises.readFile('./kodemia.json');
        const json = JSON.parse(content);
        
        const mentorFiltered = json.mentors.filter((mentor)=> mentor.id !== parseInt(idMentor))
        
        json.mentors = mentorFiltered;

        await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf-8');

        res.json(
            { success: true}
        )
    })

    module.exports = router;