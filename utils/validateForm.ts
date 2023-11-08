type ValidationObject = {
  [key: string]: any;
};

const getNestedValue = (obj: ValidationObject, field: string): any => field.split('.').reduce((o, key) => (o && o[key] !== 'undefined' ? o[key] : null), obj);

const validateForm = (
  obj: ValidationObject,
  requiredFields: Array<{field: string, name: string}>,
): string | null => {
  for (let i = 0; i < requiredFields.length; i += 1) {
    const { field, name } = requiredFields[i];
    const value = getNestedValue(obj, field);
    console.log(obj, field, name);
    if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
      return name;
    }
  }
  return null;
};

export default validateForm;
