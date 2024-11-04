export function checkEmptyValue<T extends Record<string, any>>(
  formValue: T
): Partial<T> {
  return Object.keys(formValue).reduce((acc, key) => {
    const value = formValue[key];
    if (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' &&
        value !== null &&
        Object.keys(value).length === 0)
    ) {
      return acc;
    }

    (acc as any)[key] = value;
    return acc;
  }, {} as Partial<T>);
}
