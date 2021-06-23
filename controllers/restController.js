const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const restController = {
  getRestaurants: async (req, res) => {
    try {
      const restaurants = await Restaurant.findAll({ include: Category })
      const data = restaurants.map(r => ({
        ...r.dataValues,
        description: r.dataValues.description.substring(0, 50), // 當 key 重覆時，會以後面出現的為準
        categoryName: r.Category.name
      }))
      return res.render('restaurants', { restaurants: data })
    } catch (err) {
      return console.warn(err)
    }
  },

  getRestaurant: async (req, res) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id, { include: Category })
      return res.render('restaurant', { restaurant: restaurant.toJSON() })
    } catch (err) {
      return console.warn(err)
    }
  }
}

module.exports = restController