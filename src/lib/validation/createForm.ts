import {createStore} from "$lib/validation/createStore";

export function createForm<T>(options: FormOptions) {
    return createStore<T>(options);
}