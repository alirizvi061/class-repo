// Dependencies
const express = require('express')
const methodOverride = require('method-override');

const app = express()
const PORT = 3000

// middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));

// 'Data'
const fruits = require('./models/fruits.js')

// Index
app.get('/fruits', (req, res) => {
  res.render('index.ejs', {
    fruits: fruits
  })
})

// New
app.get('/fruits/new', (req, res) => {
  res.render('new.ejs');
})

// Show
app.get('/fruits/:index', (req, res) => {
  const currentFruit = fruits[req.params.index]
  res.render('show.ejs', {
    fruit: currentFruit
  })
})

// Create
app.post('/fruits', (req, res) => {
  if (req.body.readyToEat === 'on') { // if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true
  } else { // if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false
  }
  fruits.push(req.body)
  res.redirect('/fruits')
})

// Delete
app.delete('/fruits/:index', (req, res) => {
	fruits.splice(req.params.index, 1); //remove the item from the array
	res.redirect('/fruits');  //redirect back to index route
});

// Edit
app.get('/fruits/:index/edit', (req, res) => {
  res.render('edit.ejs', {
    index: req.params.index,
    fruit: fruits[req.params.index],
  })
})

// Update
app.put('/fruits/:index', (req, res) => {
  if (req.body.readyToEat === 'on') {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  fruits[req.params.index] = req.body;
  res.redirect('/fruits');
})

app.listen(PORT, () => {
  console.log('listening on port', PORT)
})
