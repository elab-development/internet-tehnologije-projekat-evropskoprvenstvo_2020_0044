import React from "react";

const useForm = (initialData) => {
    const [formData, setFormData] = React.useState(initialData);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return {
        formData,
        handleChange
    };
}

export default useForm;