const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../restaurant.json')

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
  restaurantlist = restaurantList.results
  for (let i in restaurantlist) {
    Restaurant.create({
      name: restaurantlist[i].name,
      name_en: restaurantlist[i].name_en,
      category: restaurantlist[i].category,
      image: restaurantlist[i].image,
      location: restaurantlist[i].location,
      google_map: restaurantlist[i].google_map,
      phone: restaurantlist[i].phone,
      description: restaurantlist[i].description,
      rating: restaurantlist[i].rating
    })
  }
  console.log("done")
})