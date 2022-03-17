
function NewNutrientForm({ onSubmit = () => { } }) {
    return (
        <div>
            <input type="text" placeholder="name" />
            <button>create</button>
        </div>
    )
}

export default NewNutrientForm