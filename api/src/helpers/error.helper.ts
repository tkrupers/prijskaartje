export const handleValidationErrors = errors => {
    let simpleErrors = {};

    errors.forEach(err => {
        const { constraints } = err;
        simpleErrors = {
            ...simpleErrors,
            ...constraints,
        };
    });

    return simpleErrors;
};
