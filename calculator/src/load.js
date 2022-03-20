const fs = require('fs').promises

async function readJsonFiles(dir, exclude = []) {
    let fileNames = await fs.readdir(dir)
    fileNames = fileNames.filter(x => !exclude.includes(x))
    const ingredientsUnflattened = await Promise.all(fileNames.map(async fileName => {
        const jsonString = await fs.readFile(`${dir}/${fileName}`, 'utf8')
        return JSON.parse(jsonString)
    }))
    return ingredientsUnflattened.reduce((a, b) => ([...a, ...b]), [])
}

async function loadIngredients() {
    return readJsonFiles(`${__dirname}/../data/ingredients`, ['units.json'])
}

async function loadRecipes() {
    return readJsonFiles(`${__dirname}/../data/recipes`)
}

async function loadMeals() {
    return readJsonFiles(`${__dirname}/../data/meals`)
}

module.exports = {
    loadIngredients,
    loadRecipes,
    loadMeals
}