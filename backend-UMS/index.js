const connectToMongo = require('./db')
var cors = require('cors')
const express = require('express')
connectToMongo();
const app = express()
const port = 5000

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api',require('./routes/api'))
app.get('/none',(req,res)=>{
  res.send("RUNNING");
});
app.get('/:unknown',(req,res)=>{
  res.send({error : "UNKNOWN REQUEST, Try rechecking the route request "})
})
app.listen(port, () => {
  console.log(`App listening on the port `)
})  
