import {form as formStore} from "./store";
import type {Writable} from "svelte/store";
import {get} from "svelte/store";

export function createStore<T>(options: FormOptions): Writable<Form<T>> {
    const keys = Object.keys(options.initialValues);

    const form: Form<T> = {
        isSubmitting: false,
    };

    for (const key of keys) {
        form[key] = {
            touched: false,
            valid: false,
            errors: null,
            value: options.initialValues[key].value,
            validation: options.initialValues[key].validation,
            onChange: (e: Event) => {
                const value = (e.target as HTMLInputElement).value;
                const field = options.initialValues[key];

                if (field.onChange) {
                    field.onChange(value);
                }

                formStore.update((values) => {
                    const field = (values as Form<T>)[key];
                    field.value = value;

                    return {...values as Form<T>};
                });
            },
            onBlur: (e: FocusEvent) => {
                const field = options.initialValues[key];

                if (field.onBlur) {
                    field.onBlur(e);
                }

                formStore.update((values) => {
                    const field = (values as Form<T>)[key];

                    if (!field.touched) {
                        field.touched = true;
                    }

                    return {...values as Form<T>};
                });
            },
            onFocus: (e: FocusEvent) => {
                const field = options.initialValues[key];

                if (field.onFocus) {
                    field.onFocus(e);
                }

                formStore.update((values) => {
                    const field = (values as Form<T>)[key];

                    if (!field.touched) {
                        field.touched = true;
                    }

                    return {...values as Form<T>};
                });
            },
        }
    }

    formStore.update(() => form);

    return formStore as Writable<Form<T>>;
}

export function getStoreOptions<T>(): Form<T> {
    return get(formStore) as Form<T>;
}