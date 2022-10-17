const express = require('express')
const router = express.Router()
const fs = require('fs');
const { parse } = require('path');



router.get('/', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
    console.log(dinoData)
    res.render('dinosaurs/index', {myDinos: dinoData});
  });

  router.get('/new', (req, res) => {
      res.render('dinosaurs/new');
    });

router.get('/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs);
    console.log('This is the req.params object!', req.params)
    let dinoIndex = parseInt(req.params.idx)
    console.log(dinoData)
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
})

router.post('/', (req, res)=>{
    console.log('This is the Request Body:', req.body)
    res.redirect('/dinosaurs')
})

router.delete('/:idx', (req,res)=>{
    console.log('This is my Params object', req.params)
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
  
    // remove the deleted dinosaur from the dinosaurs array
    dinoData.splice(req.params.idx, 1)
  
    // save the new dinosaurs to the data.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
  
    //redirect to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs');
  });

router.get('/dinosaurs/edit/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
    res.render('dinosaurs/edit', {dino: dinoData[req.params.idx], dinoId: req.params.idx});
  });

  router.put('/:dinoId', (req,res) => {

    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData= JSON.parse(dinosaurs)

    dinoData[req.params.dinoData].name = req.body.name
    dinoData[req.params.dinoData].type = req.body.type

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
  res.redirect('/dinosaurs');
  })

module.exports = router;