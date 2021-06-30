const db = require('../models')
const Category = db.Category

const categoryService = require('../services/categoryService')

let categoryController = {
  getCategories: (req, res) => {
    categoryService.getCategories(req, res, (data) => {
      return res.render('admin/categories', data)
    })
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
  },

  putCategory: async (req, res) => {
    try {
      if (!req.body.name) {
        req.flash('error_messages', 'name didn\'t exist')
        return res.redirect('back')
      } else {
        const category = await Category.findByPk(req.params.id)
        await category.update(req.body)
        return res.redirect('/admin/categories')
      }
    } catch (err) {
      return console.warn(err)
    }
  },

  deleteCategory: (req, res) => {
    if (data['status'] === 'success') {
      req.flash('success_messages', data['message'])
      return res.redirect('/admin/categories')
    } else {
      req.flash('error_messages', data['message'])
    }
  }
}
module.exports = categoryController