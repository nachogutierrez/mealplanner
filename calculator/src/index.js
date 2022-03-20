const { loadMeals, loadRecipes, loadIngredients } = require('./load')
const { getTotalFat, getTotalCarbs, getNetCarbs } = require('./ingredients')
const { Meals } = require('./meals')

function printMacros(fat, carbs, protein) {
    const calories = fat * 9 + carbs * 4 + protein * 4
    const fatPct = (fat * 9) / calories
    const carbsPct = (carbs * 4) / calories
    const proteinPct = (protein * 4) / calories
    const pct = x => (x * 100).toFixed(2)
    console.log(`${pct(fatPct)}% fat, ${pct(carbsPct)}% carbs, ${pct(proteinPct)}% protein`)
}

async function printReport(mealName) {
    const ingredients = await loadIngredients()
    const recipes = await loadRecipes()
    const meals = await loadMeals()
    const { getPrice, getCalories, getTotalFat, getNetCarbs, getFiber, getTotalProtein } = Meals(ingredients, recipes)

    const meal1 = meals.find(x => x.name === mealName)

    const price = getPrice(meal1)
    const calories = getCalories(meal1)
    const fat = getTotalFat(meal1)
    const carbs = getNetCarbs(meal1)
    const fiber = getFiber(meal1)
    const protein = getTotalProtein(meal1)

    console.log(`price: ${price} euro`)
    console.log(`calories: ${calories}`)
    console.log(`fat: ${fat}`)
    console.log(`net carbs: ${carbs}`)
    console.log(`fiber: ${fiber}`)
    console.log(`protein: ${protein}`)
    printMacros(fat, carbs, protein)
}

async function main() {
    printReport('breakfast nacho peanut butter fudge')
}

main()