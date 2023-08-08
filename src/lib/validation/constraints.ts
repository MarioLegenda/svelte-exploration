
export function required(constraint: RequiredConstraint, value: PrimitiveValue, name: string): boolean | string {
    if (typeof constraint === 'boolean' && Boolean(constraint)) {
        if (!value) return `${name} is required.`;
    }

    if (typeof constraint === 'function') {
        const valid = constraint(value);
        if (valid) {
            return valid;
        }
    }

    return false;
}