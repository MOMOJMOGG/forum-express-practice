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
}

module.exports = adminController