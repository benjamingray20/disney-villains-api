const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { getAllVillains, getVillainBySlug, saveNewVillain } = require('./controllers/villains')


app.get('/villains', getAllVillains)

app.get('/villains/:slug', getVillainBySlug)

app.post('/villains', bodyParser.json(), saveNewVillain)

app.all('*', (request, respone) => {
  return respone.status(404).send('Page not found')
})

app.listen(1111, () => {
  console.log('Listening on port 1111...') // eslint-disable-line no-console
})


