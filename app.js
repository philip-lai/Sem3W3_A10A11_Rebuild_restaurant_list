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

// 列出全部 Todo
app.get('/restaurants', (req, res) => {
  res.send('列出所有 Restaurant')
})
// 新增一筆 Todo 頁面
app.get('/restaurants/new', (req, res) => {
  res.send('新增 Restaurant 頁面')
})
// 顯示一筆 Todo 的詳細內容
app.get('/restaurants/:id', (req, res) => {
  res.send('顯示 Restaurant 的詳細內容')
})
// 新增一筆  Todo
app.post('/restaurants', (req, res) => {
  res.send('建立 Restaurnat')
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