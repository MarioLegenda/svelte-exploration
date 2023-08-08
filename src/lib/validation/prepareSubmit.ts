import {getStoreOptions} from "$lib/validation/createStore";
import {required} from "$lib/validation/constraints";
import {form as formStore} from "./store";

export function prepareSubmit<T>(onSubmit: (values: T) => void) {
    return async (e: SubmitEvent) => {
        const options = getStoreOptions<T>();
        markSubmitting(options,true);

        const formData = new FormData(e.target as HTMLFormElement);

        const data: Record<string, string | number | File> = {};
        for (const field of formData) {
            const [key, value] = field;
            data[key] = value;
        }

        consolidateValues(options, data);
        const isValid = validate(options);

        formStore.update(() => {
            return {...options};
        });

        if (!isValid && onSubmit.constructor.name === 'AsyncFunction') await onSubmit(data as T);
        if (!isValid) onSubmit(data as T);

        markSubmitting(options,false);
    }
}
function consolidateValues<T>(options: Form<T>, submitData: Record<string, PrimitiveValue>) {
    const keys = Object.keys(options);

    for (const key of keys) {
        if (!options[key].value && Object.hasOwn(submitData, key)) {
            options[key].value = submitData[key];
        }
    }
}
function validate<T>(storeOptions: Form<T>) {
    const keys = Object.keys(storeOptions);

    let hasErrors = false;
    for (const key of keys) {
        const validation = storeOptions[key].validation;

        if (validation) {
            const errors: Errors = {};
            let hasInnerErrors = false;
            const value = storeOptions[key].value;
            if (Object.hasOwn(validation, 'required') && validation.required) {
                errors.required = required(validation.required, value, key);
                if (errors.required) {
                    hasErrors = true;
                    hasInnerErrors = true;
                }

                storeOptions[key].errors = errors;
            }

            if (!hasInnerErrors) {
                storeOptions[key].errors = null;
            }
        }
    }

    return hasErrors;
}

function markSubmitting<T>(options: Form<T>, mark: boolean) {
    options.isSubmitting = mark;
    formStore.update(() => {
        return {...options};
    });
}