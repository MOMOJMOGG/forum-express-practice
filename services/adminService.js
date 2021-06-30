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
  }
}
module.exports = adminService