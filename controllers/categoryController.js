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
  },

  postCategory: async (req, res) => {
    try {
      if (!req.body.name) {
        req.flash('error_messages', 'name didn\'t exist')
        return res.redirect('back')
      } else {
        await Category.create({ name: req.body.name })
        return res.redirect('/admin/categories')
      }
    } catch (err) {
      return console.warn(err)
    }
  }
}
module.exports = categoryController