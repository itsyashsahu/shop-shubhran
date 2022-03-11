const express = require('express')
const bodyParser = require('body-parser')
const shopRoute = require('./Routes/Shop-route')
const userRoute = require('./Routes/User-route')
const cors = require('cors')
const PORT = process.env.PORT || 5000

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use('/api/shop', shopRoute)
app.use('/api/user', userRoute)

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT);