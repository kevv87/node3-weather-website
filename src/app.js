const path = require('path')
const express =require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirPath))  // Se llama a static porque esos recursos no se actualizan

/*  //No es necesario esto por el nombre especial index.html en public
app.get('', (req, res)=>{   // Argumentos: route & what to do
  res.send('Hello express')
})*/

app.set('view engine', 'hbs') // What I want to include, the module name
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
  res.render('index',{
    title: 'Weather App',
    name: 'Kevin'
  }) // Renderiza las views, args: nombredeArchivo, objeto con datos necesarios
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title: 'About me',
    name: 'Kevin'
  }) // Renderiza las views, args: nombredeArchivo, objeto con datos necesarios
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title: 'Help',
    txt: 'Example message',
    name: 'Kevin'
  }) // Renderiza las views, args: nombredeArchivo, objeto con datos necesarios
})

app.get('/weather',(req,res)=>{
  // Address?
  if(!req.query.address){
    return res.send({
      error:"No address provided"
    })
  }

  return geocode(req.query.address,(error, {lat,lon,location}={})=>{
    console.log(error);
    if(error){
      res.send({
        error
      })
    }else{
      forecast(lat, lon, (error, {summary, temp, prob}={})=>{
        if(error){
          res.send({error})
        }else{
          res.send({
          summary, temp, prob
          })
        }
      })
    }
  })
})

app.get('/products',(req,res)=>{  // Express da una manera para forzar queries to be provided
  if(!req.query.search){  // Solo se ejecuta cuando no hay un search
    return res.send({
      error:'You must provide a search term'
    })
  }

  res.send({
    products:[]
  })
})

app.get('/help/*',(req,res)=>{ // * significa 'todo lo que no se haya enlistado anteriormente'
  res.render('404',{
    title:'404',
    name:'Kevin',
    message:'Help article not found'
  })
})

app.get('*',(req,res)=>{ // * significa 'todo lo que no se haya enlistado anteriormente'
  res.render('404',{
    title:'404',
    name:'Kevin',
    message:'Page not found'
  })
})

app.listen(3000, ()=>{  // Argumentos: puerto & what to do when started
  console.log('Server up');
})
