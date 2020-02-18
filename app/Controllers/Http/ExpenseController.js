'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Expense = use('App/Models/Expense')

/**
 * Resourceful controller for interacting with expenses
 */
class ExpenseController {
  /**
   * Show a list of all expenses.
   * GET expenses
   */
  async index({ auth }) {
    const expenses = await Expense.query()
      .where('user_id', auth.current.user.id)
      .fetch()

    return expenses
  }

  /**
   * Render a form to be used for creating a new expense.
   * GET expenses/create
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new expense.
   * POST expenses
   */
  async store({ request, auth }) {
    const data = request.only(['amount', 'description', 'category_id'])

    return Expense.create({ user_id: auth.current.user.id, ...data })
  }

  /**
   * Display a single expense.
   * GET expenses/:id
   */
  async show({ params, request, response, view }) {
    // TODO: HOMEWORK
  }

  /**
   * Render a form to update an existing expense.
   * GET expenses/:id/edit
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update expense details.
   * PUT or PATCH expenses/:id
   */
  async update({ params, request, response }) {
    // TODO: HOMEWORK
  }

  /**
   * Delete a expense with id.
   * DELETE expenses/:id
   */
  async destroy({ params, request, response }) {}
}

module.exports = ExpenseController
