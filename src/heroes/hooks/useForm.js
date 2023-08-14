import { useState } from "react";

export const useForm = ( initialForm = {} ) => {
    const [ formState, setFormState] = useState( initialForm );
    
    // {
    //     username: '',
    //     email: '',
    //     password: ''
    // }

    const onInputChange = (e) => {
        const { name, value } = e.target;

        setFormState({
            ...formState,
            [ name ]: value
        });
    };

    const onResetForm = () => {
        setFormState( initialForm );
    };
    
    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm
    }
}