const express = require('express')
const app = express()
const mongoose = require('mongoose')

// 引用 express-handlebars
const exphbs = require('express-handlebars');

// 告訴 express 使用 handlebars 當作 template engine 並預設 layout 是 main
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 引用 body-parser
const bodyParser = require('body-parser');
// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// setting static files
app.use(express.static('public'))

// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

// mongoose 連線後透過mongoose.connection拿到Connection的物件
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 載入restaurant model
const Restaurant = require('./models/restaurant')

// 設定第一個首頁路由
app.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })

  // return res.render('index')
  // res.send('hello world')
})

// 列出全部 Todo
app.get('/restaurants', (req, res) => {
  res.send('列出所有 Restaurant')
})

// 新增一筆 Todo 頁面
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
  // res.send('新增 Restaurant 頁面')
})

// 顯示一筆 Todo 的詳細內容
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail', { restaurant: restaurant })
  })
  // res.send('顯示 Restaurant 的詳細內容')
})

// 新增一筆  Todo
app.post('/restaurants', (req, res) => {
  // 建立Todo model 實例
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    location: req.body.location,
    phone: req.body.phone,
    description: req.body.description,
    google_map: req.body.google_map,
    image: req.body.image,
    rating: req.body.rating
  })

  // 存入資料庫
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
  // res.send('建立 Restaurnat')
})

// 修改 Todo 頁面
app.get('/restaurants/:id/edit', (req, res) => {
  res.send('修改 Restaurant 頁面')
})

// 修改 Todo
app.post('/restaurants/:id/edit', (req, res) => {
  res.send('修改 Restaurant')
})

// 刪除 Todo
app.post('/restaurants/:id/delete', (req, res) => {
  res.send('刪除 Restaurant')
})

//設定express port 3000
app.listen(3000, () => {
  console.log('app is running')
})