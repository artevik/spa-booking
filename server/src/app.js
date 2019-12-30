/**
 * Created by Artem on 30.12.2019.
 */

const express = require('express')
const config = require('config').get('Customer')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express ()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

let PORT = config.get('dbConfig.port') || process.env.PORT

async function start (){
    try{
       await mongoose.connect(config.get('dbConfig.host'), {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useCreateIndex: true
        })

        app.listen(PORT, () => console.log(`Server start on port ${PORT}`))

        app.get('/posts', (req, res) => {
            res.send({
                title: "Hello World!",
                description: "Hi there! How are you?"
            })
        })

    } catch (e) {
        console.log('Server errorr', e.message)
        process.exit(1)
    }
}


start()