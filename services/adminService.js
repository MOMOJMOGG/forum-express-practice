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
      return callback({ error_messages: "getRestaurants Failed!" })
    }
  },

  getRestaurant: async (req, res, callback) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id, { include: [Category] })
      return callback({ restaurant: restaurant.toJSON() })
    } catch (err) {
      return callback({ error_messages: "getRestaurant Failed!" })
    }
  },

  deleteRestaurant: async (req, res, callback) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id)
      await restaurant.destroy()
      return callback({ status: 'success', message: 'restaurant was successfully to delete' })
    } catch (err) {
      return console.warn(err)
    }
  },
}
module.exports = adminService