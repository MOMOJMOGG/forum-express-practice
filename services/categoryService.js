const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const categoryService = {
  getCategories: async (req, res, callback) => {
    try {
      const categories = await Category.findAll({ raw: true, nest: true })
      if (req.params.id) {
        const category = await Category.findByPk(req.params.id)
        return callback({ categories: categories, category: category.toJSON() })
      } else {
        return callback({ categories: categories })
      }
    } catch (err) {
      return callback({ error_messages: "getCategories Failed!" })
    }
  },
}
module.exports = categoryService