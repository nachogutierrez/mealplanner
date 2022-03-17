import { useState } from 'react'
import NewNutrientForm from './NewNutrientForm'
import NutrientsList from "./NutrientsList"
import Values from "./Values"

function LoadNutrientView() {
    const [nutrients, setNutrients] = useState([])

    return (
        <div>
            <NewNutrientForm></NewNutrientForm>
            <NutrientsList nutrients={nutrients}></NutrientsList>
        </div>
    )
}

export default LoadNutrientView