'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExpenseSchema extends Schema {
  up() {
    this.create('expenses', (table) => {
      table.increments()
      table.timestamps()
      table.decimal('amount', 8, 2)
      table.string('description', 255)
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('users')
    })
  }

  down() {
    this.drop('expenses')
  }
}

module.exports = ExpenseSchema
