const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const adminService = {
  getRestaurants: async (req, res, callback) => {
    try {
      const restaurants = await Restaurant.findAll({
        raw: true,
        nest: true,
        include: [Category]
      })
      return callback({ restaurants: restaurants })
    } catch (err) {
      return callback({ status: 'error', message: 'Get Restaurants Failed!' })
    }
  },

  getRestaurant: async (req, res, callback) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id, { include: [Category] })
      return callback({ restaurant: restaurant.toJSON() })
    } catch (err) {
      return callback({ status: 'error', message: 'Get Restaurant Failed!' })
    }
  },

  postRestaurant: async (req, res, callback) => {
    try {
      if (!req.body.name) {
        return callback({ status: 'error', message: 'name didn\'t exist' })
      }
      const { file } = req
      if (file) {
        imgur.setClientID(IMGUR_CLIENT_ID);
        imgur.upload(file.path, async (err, img) => {
          await Restaurant.create({
            name: req.body.name,
            tel: req.body.tel,
            address: req.body.address,
            opening_hours: req.body.opening_hours,
            description: req.body.description,
            image: file ? img.data.link : null,
            CategoryId: req.body.categoryId
          })
          return callback({ status: 'success', message: 'restaurant was successfully created' })
        })
      } else {
        await Restaurant.create({
          name: req.body.name,
          tel: req.body.tel,
          address: req.body.address,
          opening_hours: req.body.opening_hours,
          description: req.body.description,
          image: null,
          CategoryId: req.body.categoryId
        })
        return callback({ status: 'success', message: 'restaurant was successfully created' })
      }
    } catch (err) {
      return callback({ status: 'error', message: 'Post Restaurant Failed!' })
    }
  },

  deleteRestaurant: async (req, res, callback) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id)
      await restaurant.destroy()
      return callback({ status: 'success', message: 'restaurant was successfully to delete' })
    } catch (err) {
      return callback({ status: 'error', message: 'Delete Restaurant Failed!' })
    }
  },
}
module.exports = adminService