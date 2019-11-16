const express = require('express')
const app = express()
const mongoose = require('mongoose')

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
  res.send('hello world')
})

//設定express port 3000
app.listen(3000, () => {
  console.log('app is running')
})