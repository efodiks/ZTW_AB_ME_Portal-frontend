import {useState} from "react";


export const useFormState = (initialState, error = null, clearErrorsFunction = undefined) => {
    const [formState, setFormState] = useState(initialState);

    const onChange = e => {
        const {name, value} = e.target;
        if (clearErrorsFunction && error !== null) clearErrorsFunction()
        setFormState((prevState => {
            return {
                ...prevState,
                [name]: value
            }
        }))
    };

    return [
        formState, onChange
    ]
};