const {
    getPrice: getIngredientPrice,
    getCalories: getIngredientCalories,
    getTotalFat: getIngredientTotalFat,
    getFiber: getIngredientFiber,
    getNetCarbs: getIngredientNetCarbs,
    getTotalProtein: getIngredientTotalProtein
} = require('./ingredients')
const { getOrElse } = require('./utils')

const get = getOrElse(0)

const qtyMultiplier = qty => qty / 100

function getIngredientNutrient(pool, getter, name, qty) {
    const obj = pool.find(x => x.name === name)
    if (!obj) {
        throw new Error(`could not find item '${name}' in pool`)
    }
    return getter(obj) * (qty / 100)
}

function aggregate(pool, mealItems, getter) {
    return mealItems.reduce((x, [name, qty]) => {
        const item = pool.find(x => x.name === name)
        if (!item) {
            throw new Error(`could not find item '${name}' in pool`)
        }
        return x + getter(item) * (qty / 100)
    }, 0)
}

function expandRecipes(pool, recipes = []) {
    return recipes.map(([recipeName, servings]) => {
        const recipe = pool.find(x => x.name === recipeName)
        return recipe.ingredients.map(([ingredientName, qty]) => [ingredientName, qty * (servings / recipe.servings)])
    }).reduce((a, b) => [...a, ...b], [])
}

function Meals(ingredients, recipes) {

    const getPrice = get(meal => aggregate(ingredients, [...(meal.ingredients || []), ...expandRecipes(recipes, meal.recipes)], getIngredientPrice))
    const getCalories = get(meal => aggregate(ingredients, [...(meal.ingredients || []), ...expandRecipes(recipes, meal.recipes)], getIngredientCalories))
    const getTotalFat = get(meal => aggregate(ingredients, [...(meal.ingredients || []), ...expandRecipes(recipes, meal.recipes)], getIngredientTotalFat))
    const getNetCarbs = get(meal => aggregate(ingredients, [...(meal.ingredients || []), ...expandRecipes(recipes, meal.recipes)], getIngredientNetCarbs))
    const getFiber = get(meal => aggregate(ingredients, [...(meal.ingredients || []), ...expandRecipes(recipes, meal.recipes)], getIngredientFiber))
    const getTotalProtein = get(meal => aggregate(ingredients, [...(meal.ingredients || []), ...expandRecipes(recipes, meal.recipes)], getIngredientTotalProtein))

    return {
        getPrice,
        getCalories,
        getTotalFat,
        getNetCarbs,
        getFiber,
        getTotalProtein
    }
}

module.exports = { Meals }