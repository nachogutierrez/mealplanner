const { getOrElse } = require('./utils')

const get = getOrElse(0)

const getPrice = get(ingredient => ingredient.price)
const getCalories = get(ingredient => ingredient.calories)
const getTotalFat = get(ingredient => ingredient.macros.fat.total)
const getTotalCarbs = get(ingredient => ingredient.macros.carbs.total)
const getFiber = get(ingredient => ingredient.macros.carbs.fiber)
const getNetCarbs = get(ingredient => getTotalCarbs(ingredient) - getFiber(ingredient))
const getTotalProtein = get(ingredient => ingredient.macros.protein.total)

module.exports = {
    getPrice,
    getCalories,
    getTotalFat,
    getTotalCarbs,
    getFiber,
    getNetCarbs,
    getTotalProtein
}