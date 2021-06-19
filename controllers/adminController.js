const fs = require('fs')
const db = require('../models')
const Restaurant = db.Restaurant

const adminController = {
  getRestaurants: async (req, res) => {
    try {
      const restaurants = await Restaurant.findAll({ raw: true })
      return res.render('admin/restaurants', { restaurants: restaurants })
    } catch (err) {
      return console.warn(err)
    }
  },

  createRestaurant: (req, res) => {
    return res.render('admin/create')
  },

  postRestaurant: async (req, res) => {
    try {
      if (!req.body.name) {
        req.flash('error_messages', "name didn't exist")
        return res.redirect('back')
      }
      const { file } = req
      if (file) {
        fs.readFile(file.path, (err, data) => {
          if (err) console.log('Error', err)
          fs.writeFile(`upload/${file.originalname}`, data, async () => {
            await Restaurant.create({
              name: req.body.name,
              tel: req.body.tel,
              address: req.body.address,
              opening_hours: req.body.opening_hours,
              description: req.body.description,
              image: file ? `/upload/${file.originalname}` : null
            })
            req.flash('success_messages', 'restaurant was successfully created')
            res.redirect('/admin/restaurants')
          })
        })
      } else {
        await Restaurant.create({
          name: req.body.name,
          tel: req.body.tel,
          address: req.body.address,
          opening_hours: req.body.opening_hours,
          description: req.body.description,
          image: null
        })
        req.flash('success_messages', 'restaurant was successfully created')
        res.redirect('/admin/restaurants')
      }
    } catch (err) {
      return console.warn(err)
    }
  },

  getRestaurant: async (req, res) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id, { raw: true })
      return res.render('admin/restaurant', { restaurant: restaurant })
    } catch (err) {
      return console.warn(err)
    }
  },

  editRestaurant: async (req, res) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id, { raw: true })
      return res.render('admin/create', { restaurant: restaurant })
    } catch (err) {
      return console.warn(err)
    }
  },

  putRestaurant: async (req, res) => {
    try {
      if (!req.body.name) {
        req.flash('error_messages', "name didn't exist")
        return res.redirect('back')
      }
      const { file } = req
      if (file) {
        fs.readFile(file.path, (err, data) => {
          if (err) console.log('Error: ', err)
          fs.writeFile(`upload/${file.originalname}`, data, async () => {
            const restaurant = await Restaurant.findByPk(req.params.id)
            await restaurant.update({
              name: req.body.name,
              tel: req.body.tel,
              address: req.body.address,
              opening_hours: req.body.opening_hours,
              description: req.body.description,
              image: file ? `/upload/${file.originalname}` : restaurant.image
            })
            req.flash('success_messages', 'restaurant was successfully to update')
            res.redirect('/admin/restaurants')
          })
        })
      } else {
        const restaurant = await Restaurant.findByPk(req.params.id)
        await restaurant.update({
          name: req.body.name,
          tel: req.body.tel,
          address: req.body.address,
          opening_hours: req.body.opening_hours,
          description: req.body.description,
          image: restaurant.image
        })
        req.flash('success_messages', 'restaurant was successfully to update')
        res.redirect('/admin/restaurants')
      }
    } catch (err) {
      return console.warn(err)
    }
  },

  deleteRestaurant: async (req, res) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id)
      await restaurant.destroy()
      req.flash('success_messages', 'restaurant was successfully to delete')
      res.redirect('/admin/restaurants')
    } catch (err) {
      return console.warn(err)
    }
  }
}

module.exports = adminController