'use strict'

const Category = use('App/Models/Category')

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   */
  async index({ auth }) {
    const categories = await Category.query()
      .where('user_id', auth.current.user.id)
      .fetch()

    return categories
  }

  /**
   * Render a form to be used for creating a new category.
   * GET categories/create
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new category.
   * POST categories
   */
  async store({ request, auth, response }) {
    const { name, icon = 'none' } = request.only(['name', 'icon'])
    const category = new Category()
    category.name = name
    category.icon = icon
    category.user_id = auth.current.user.id

    return category.save()
  }

  /**
   * Display a single category.
   * GET categories/:id
   */
  async show({ params, request, response, view }) {
    return Category.findOrFail(params.id)
  }

  /**
   * Render a form to update an existing category.
   * GET categories/:id/edit
   */
  async edit({ params, request, response, view }) {
    // TODO: HOMEWORK
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   */
  async update({ params, request, response }) {
    // TODO: HOMEWORK
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   */
  async destroy({ params, request, response }) {
    // TODO: HOMEWORK
  }
}

module.exports = CategoryController
