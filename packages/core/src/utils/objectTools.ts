export interface PickFieldsProps<T extends object, K extends keyof T> {
    objectToFilter: T;
    fieldsToKeep: readonly K[];
}

export function pickFields<T extends object, K extends keyof T>({
    objectToFilter,
    fieldsToKeep,
}: PickFieldsProps<T, K>): Pick<T, K> {
    const result = {} as Pick<T, K>;

    for (const field of fieldsToKeep) {
        if (field in objectToFilter) {
            result[field] = objectToFilter[field];
        }
    }

    return result;
}
