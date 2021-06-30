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

  postCategory: async (req, res, callback) => {
    try {
      if (!req.body.name) {
        return callback({ status: 'error', message: 'name didn\'t exist' })
      } else {
        await Category.create({ name: req.body.name })
        return callback({ status: 'success', message: 'Category was successfully create' })
      }
    } catch (err) {
      return callback({ error_messages: "Post Category Failed!" })
    }
  },

  deleteCategory: async (req, res, callback) => {
    try {
      const category = await Category.findByPk(req.params.id)
      await category.destroy()
      return callback({ status: 'success', message: 'restaurant was successfully to delete' })
    } catch (err) {
      return callback({ status: 'error', message: 'Delete Restaurant Failed!' })
    }
  }
}
module.exports = categoryService