import { useRef } from 'react'
import './ValueField.css'

function onEnterPress(f) {
    return e => {
        if (e.key === 'Enter') {
            e.preventDefault()
            f(e)
        }
    }
}

const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

    return [htmlElRef, setFocus]
}

function ValueField({ onValueConfirmed = () => { } }) {
    const [inputRef, setInputFocus] = useFocus()

    return (
        <div className='ValueField'>
            <input type="text" placeholder="name" autoComplete='nope' onKeyPress={onEnterPress(e => {
                console.log('enter');
                setInputFocus()
            })} />
            <input ref={inputRef} type="text" placeholder='value' autoComplete='nope' onKeyPress={onEnterPress(e => {
                onValueConfirmed()
            })} />
        </div>
    )
}

export default ValueField