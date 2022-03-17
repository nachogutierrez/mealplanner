function NutrientsList({ nutrients = [] }) {

    return (
        <div>{nutrients.map(nutrient => {

            return <div key={nutrient}>{nutrient}</div>
        })}</div>
    )
}

export default NutrientsList