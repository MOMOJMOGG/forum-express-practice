const fs = require('fs')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const db = require('../models')
const Category = db.Category
const Restaurant = db.Restaurant
const User = db.User
const helpers = require('../_helpers')                     // add for test

const adminService = require('../services/adminService')

const adminController = {
  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, (data) => {
      return res.render('admin/restaurants', data)
    })
  },

  createRestaurant: async (req, res) => {
    try {
      const categories = await Category.findAll({ raw: true, nest: true })
      return res.render('admin/create', { categories: categories })
    } catch (err) {
      return console.warn(err)
    }
  },

  postRestaurant: (req, res) => {
    adminService.postRestaurant(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      res.redirect('/admin/restaurants')
    })
  },

  getRestaurant: (req, res) => {
    adminService.getRestaurant(req, res, (data) => {
      return res.render('admin/restaurant', data)
    })
  },

  editRestaurant: async (req, res) => {
    try {
      const categories = await Category.findAll({ raw: true, nest: true })
      const restaurant = await Restaurant.findByPk(req.params.id)
      return res.render('admin/create', { restaurant: restaurant.toJSON(), categories: categories })
    } catch (err) {
      return console.warn(err)
    }
  },

  putRestaurant: (req, res) => {
    adminService.putRestaurant(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      res.redirect('/admin/restaurants')
    })
  },

  deleteRestaurant: (req, res) => {
    adminService.deleteRestaurant(req, res, (data) => {
      if (data['status'] === 'success') {
        req.flash('success_messages', data['message'])
        return res.redirect('/admin/restaurants')
      }
    })
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.findAll({ raw: true })
      return res.render('admin/users', { users: users })
    } catch (err) {
      return console.warn(err)
    }
  },

  toggleAdmin: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id)
      await user.update({ isAdmin: !user.toJSON().isAdmin, updated_by: req.user.id })
      // await user.update({ isAdmin: !user.toJSON().isAdmin, updated_by: helpers.getUser(req).id })  // add for test
      req.flash('success_messages', 'user role was successfully to update')
      res.redirect('/admin/users')
    } catch (err) {
      return console.warn(err)
    }
  }
}

module.exports = adminController