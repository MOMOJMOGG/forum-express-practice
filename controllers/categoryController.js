const db = require('../models')
const Category = db.Category

let categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.findAll({ raw: true, nest: true })
      return res.render('admin/categories', { categories: categories })
    } catch (err) {
      return console.warn(err)
    }
  }
}
module.exports = categoryController