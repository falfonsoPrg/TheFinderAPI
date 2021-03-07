const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 4000
dotenv.config();

require("./database/seq")

//Cors configuration
const config = {
    application: {
        cors: {
            server: [{
                origin: "*",
                credentials: true
            }]
        }
    }
}
app.use(cors(
    config.application.cors.server
));

//Fisrt route
app.get('/',(req,res)=>{
    res.send('This is the api for The Finder Application')
})
//Import routes
const AuthRoutes = require('./routes/AuthRoutes')
const UsersRoutes = require('./routes/UsersRoutes')
const ObjectTypeRoutes = require('./routes/ObjectTypeRoutes')
const ObjectRoutes = require('./routes/ObjectRoutes')
const PublicationRoutes = require('./routes/PublicationRoutes')
const RegistriesRoutes = require('./routes/RegistriesRoutes')

//Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'));

//Route Middleware
app.use('/api/',AuthRoutes)
app.use('/api/users/',UsersRoutes)
app.use('/api/objecttypes/',ObjectTypeRoutes)
app.use('/api/objects/',ObjectRoutes)
app.use('/api/publications/',PublicationRoutes)
app.use('/api/registries/',RegistriesRoutes)

//Initialize server 
app.listen(port,() => {
    console.log('Server on port ' + port)
}) 
