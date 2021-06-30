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
}
module.exports = adminService