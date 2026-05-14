export interface EntityValidator<TExpectedEntity> {
    validate(rawData: unknown): TExpectedEntity;
}

export interface ValidatorFactory {
    createValidator<TExpectedData>(schema: unknown): EntityValidator<TExpectedData>;
}