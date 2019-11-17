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

// 列出全部 Restaurant
app.get('/restaurants', (req, res) => {
  return res.render('new')
  //res.send('列出所有 Restaurant')
})

// 新增一筆 Restaurant 頁面
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
  // res.send('新增 Restaurant 頁面')
})

// 顯示一筆 restaurant 的詳細內容
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail', { restaurant: restaurant })
  })
  // res.send('顯示 Restaurant 的詳細內容')
})

// 新增一筆  Restaurant
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

// 修改 Restaurant 頁面
app.get('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant: restaurant })
  })
  // res.send('修改 Restaurant 頁面')
})

// 修改 Restaurnat
app.post('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    console.log(req.params.id)
    if (err) return console.error(err)
    restaurant.name = req.body.name
    restaurant.name_en = req.body.name_en
    restaurant.category = req.body.category
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.description = req.body.description
    restaurant.google_map = req.body.google_map
    restaurant.image = req.body.image
    restaurant.rating = req.body.rating

    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
  // res.send('修改 Restaurant')
})

// 刪除 Restaurant
app.post('/restaurants/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
  // res.send('刪除 Restaurant')
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  if (keyword.trim().length === 0) {
    return res.redirect('/')
  } else {
    Restaurant.find((err, restaurants) => {
      if (err) return console.error(err)
      const searchResults = restaurants.filter(restaurant => {
        return (restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase()) || restaurant.location.toLowerCase().includes(keyword.toLowerCase()) || restaurant.description.toLowerCase().includes(keyword.toLowerCase())
        )
      })
      res.render('index', { restaurants: searchResults })
    })

  }
})

app.post('/sort', (req, res) => {
  console.log(req.body)
  return res.redirect('/')
})




//設定express port 3000
app.listen(3000, () => {
  console.log('app is running')
})