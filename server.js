const express = require('express')
const app = express()
var cors = require("cors")
const mysql = require('mysql2')
const port = 5000


const query =  mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"store",
    port: "3307"
})


app.use(express.json());
app.use(cors());


app.post('/add', (req,res)=>{
    const {name, price, qty} = req.body
    query.query(`INSERT INTO products('name', 'price', 'qty')VALUES('${name}', ${price}',${qty}')`)
    res.json({message:"product add sucssefully"})
})

app.get('/prod',(req,res)=>{

   query.query("SELECT * FROM products", (err,data)=>{
    if(err){
        res.json({message:'error/n', err})
    }else{
        res.json({message:'success', data})
    }
   })
})
app.get('/prod/id',(req,res)=>{
   const {id} = req.params

   query.query(`SELECT * FROM products where id ='${id}'`, (err,data)=>{
    if(err){
        res.json({message:'error', err})
    }else{
        res.json({message:'success', data})
    }
   })
})

app.put('/update',(req,res)=>{
    const {id,name, price, qty} = req.body
    query.query(`UPDATE products set 
    name='${name}', price='${price}', qty='${qty} where id =${id}`)
    res.json({message:"product updated sucssefully"})
})

app.delete('/delete',(req,res)=>{
    const {id} = req.body
    query.query(`DELETE FROM products where id=${id}`)
    res.json({message:"product DELETE sucssefully"})
})


app.listen(port, () => console.log
(`Server is running Well on port ${port}`))


