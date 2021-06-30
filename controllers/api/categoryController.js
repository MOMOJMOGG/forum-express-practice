const db = require('../../models')
const Restaurant = db.Restaurant
const Category = db.Category

const categoryService = require('../../services/categoryService')

const adminController = {
  getCategories: (req, res) => {
    categoryService.getCategories(req, res, (data) => {
      return res.json(data)
    })
  }
}
module.exports = adminController