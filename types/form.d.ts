interface CreateTaskForm {
    name: string;
    description: string;
    text: string;
}

type PrimitiveValue = string | number | File;
type VoidFn = () => void;

type RequiredConstraint = boolean | ((value: PrimitiveValue) => undefined | string);
type MinConstraint = number | ((value: PrimitiveValue) => undefined | string);
type MaxConstraint = number | ((value: PrimitiveValue) => undefined | string);
type CustomValidation = (value: PrimitiveValue) => undefined | string;
interface FieldValidation {
    required?: RequiredConstraint;
    min?: MinConstraint;
    max?: MaxConstraint;
    validate?: CustomValidation;
}
interface FormOptions {
    initialValues: {
        [key: string]: {
            value: PrimitiveValue;
            onChange?: (value: PrimitiveValue) => void;
            onBlur?: (e: FocusEvent) => void;
            onFocus?: (e: FocusEvent) => void;
            validation?: FieldValidation;
        };
    }
}

interface Errors {
    required?: boolean | string;
    min?: boolean | string;
    max?: boolean | string;
    validate?: boolean | string;
}
interface Form<T> {
    [key: keyof T | string]: {
        touched: boolean;
        valid: boolean;
        value: PrimitiveValue;
        validation?: FieldValidation;
        onChange?: import("svelte/elements").ChangeEventHandler;
        onBlur?: import("svelte/elements").FocusEventHandler<FocusEvent>;
        onFocus?: import("svelte/elements").FocusEventHandler<FocusEvent>;
        errors: Errors | null;
    },
    isSubmitting: boolean,
}