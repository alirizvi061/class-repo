# Create an API

## Lesson Objectives

1. Define API
1. Set Up Express Server
1. Create Holiday Controller
1. Initialize Mongoose
1. Create Holiday Model
1. Create Create Route
1. Create Index Route
1. Create Delete Route
1. Create Update Route

## Define API

- An API stands for Application Program Interface
- It is a set of routines, protocols, and tools for building software applications
- It specifies how software components should interact
- Essentially it's documentation, but in the industry, it's come to mean a program or some existing software that you use to build your own app
- In unit 1 we used a 3rd Party API, now we'll make our own and have React consume it

## What we're building

We live in a time where there are so many holidays! Many times we forget to celebrate. So we'll build a holidays app to create, show and delete our holidays, we'll also be able to update whether or not we've celebrated the holiday

First we'll build our API which will just serve JSON. We'll create, update, and delete usin cURL

![api](https://i.imgur.com/4jk0nOO.png)


Once we have built and tested our back end we'll build our React front end using Create-React App


Class build:

![holidays app example](https://i.imgur.com/B3sP2wq.png)

For lab, you'll continue on your own to click the balloons in order to increase likes and press the pencil to show a pre-filled form to let you edit the whole field:

![holidays app lab portion](https://i.imgur.com/CvFFanb.png)

## Set Up

In student examples for today:

ADDS an image of folder structure from SkETCH!!!

1. `mkidr holidays`
1. `cd holidays`
1. `mkdir holidays_api`
1. `cd holidays_api`
1. `touch server.js`
1. `npm init -y`
1. set entry point as server.js
1. `npm install express`

## Set Up Express Server

server.js:

```javascript
const express = require('express')
const app = express()
const PORT = 3003

app.listen(PORT, () => {
  console.log('🎉🎊', 'celebrations happening on port', PORT, '🎉🎊',)
})
```

## Create Holidays Controller

1. `mkdir controllers`
1. `touch controllers/holidays.js`

controllers/holidays.js:

```javascript
const express = require('express')
const holidays = express.Router()

holidays.get('/', (req, res) => {
  res.send('index')
})

module.exports = holidays
```

`server.js:`

```javascript
const holidaysController = require('./controllers/holidays.js')
app.use('/holidays', holidaysController)
```

visit : http://localhost:3003/holidays

## Initialize Mongoose

1. `npm install mongoose`

server.js:

```javascript
const mongoose = require('mongoose')

//...farther down the page

// Error / Disconnection
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

//...farther down the page

mongoose.connect('mongodb://localhost:27017/holidays', { useNewUrlParser: true })
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})
```

Open terminal tabs for `mongod` and `mongo`

## Create Holiday Model

1. `mkdir models`
1. `touch models/holidays.js`

Our holidays should:
- have a required name
- a boolean of whether or not we celebrated this holiday this year
- a description, let's default it to `best holiday ever!`
- likes, a number, default it to 0
- tags, an array of strings

models/holidays.js:

```javascript

const mongoose = require('mongoose')

const holidaySchema = mongoose.Schema({
  name: {type: String, required: true},
  celebrated: {type: Boolean, default: false},
  description: {type: String, default: 'Best holiday ever!'},
  likes: {type: Number, default: 0},
  tags: [{type: String}]
})

module.exports = mongoose.model('Holiday', holidaySchema)
```

## Create Create Route

1. We need to tell Express to expect JSON data in the body from AJAX, so we'll use `express.json()`
1. We'll also need to tell the client that the data coming back is JSON, not HTML, so we'll do `res.json()`

server.js:

```javascript
// middleware
app.use(express.json()); //use .json(), not .urlencoded()
```

controllers/holidays.js

```javascript
const Holiday = require('../models/holidays.js')
//...farther down the page
holidays.post('/', async (req, res) => {
  Holiday.create(req.body, (error, createdHoliday) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }
    res.status(200).send(createdHoliday) //  .json() will send proper headers in response so client knows it's json coming back
  })
})
```

test: `curl -X POST -H "Content-Type: application/json" -d '{"name":"world kindness"}' http://localhost:3003/holidays`

test: `curl -X POST -H "Content-Type: application/json" -d '{"name":"zipper"}' http://localhost:3003/holidays`

## Create Index Route

controllers/holidays.js:

```javascript
holidays.get('/', (req, res) => {
  Holiday.find({}, (err, foundHolidays) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(foundHolidays)
  })
})
```

test: `curl http://localhost:3003/holidays`

## Create Delete Route

```javascript
holidays.delete('/:id', (req, res) => {
  Holiday.findByIdAndRemove(req.params.id, (err, deletedHoliday) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(deletedHoliday)
  })
})
```

test: `curl -X DELETE http://localhost:3003/holidays/5cc738d41f84cd0a2e1225bb` (replace the id with the id from your curl request)

## Create Update Route

controllers/holidays.js:

```javascript
holidays.put('/:id', (req, res) => {
  Holiday.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedHoliday) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(updatedHoliday)
  })
})
```

test: `curl -X PUT -H "Content-Type: application/json" -d '{"name":"I updated this"}' http://localhost:3003/holidays/5cc738d41f84cd0a2e1225bb`


---

**server.js**

```js
// Dependencies
const express = require('express')
const mongoose = require('mongoose')
// Dependency configurations
const app = express()
const PORT = 3003

// middleware
app.use(express.json()) // use .json(), not .urlencoded()

// Database Error / Disconnection
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

// Database connection
mongoose.connect('mongodb://localhost:27017/merncrud', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to mongoose...')
})

// Controllers/Routes
const holidaysController = require('./controllers/holidays.js')
app.use('/holidays', holidaysController)

// Listen
app.listen(PORT, () => {
  console.log('🎉🎊', 'celebrations happening on port', PORT, '🎉🎊')
})

```

**models/holidays.js**
```js
const mongoose = require('mongoose')

const holidaySchema = mongoose.Schema({
  name: {type: String, required: true},
  celebrated: {type: Boolean, default: false},
  description: {type: String, default: 'Best holiday ever!'},
  likes: {type: Number, default: 0},
  tags: [{type: String}]
})

module.exports = mongoose.model('Holiday', holidaySchema)
```

**controllers/holidays.js**

```js
const express = require('express')
const holidays = express.Router()
const Holiday = require('../models/holidays.js')

holidays.post('/', async (req, res) => {
  Holiday.create(req.body, (error, createdHoliday) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }
    res.status(200).send(createdHoliday) //  .json() will send proper headers in response so client knows it's json coming back
  })
})

holidays.get('/', (req, res) => {
  Holiday.find({}, (err, foundHolidays) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(foundHolidays)
  })
})

holidays.delete('/:id', (req, res) => {
  Holiday.findByIdAndRemove(req.params.id, (err, deletedHoliday) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(deletedHoliday)
  })
})

holidays.put('/:id', (req, res) => {
  Holiday.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedHoliday) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(updatedHoliday)
  })
})

module.exports = holidays

```
