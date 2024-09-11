function createFormData(object: Record<string, any>) {
  const entries = Object.entries(object);
  const formData = new FormData();

  entries.forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((insideValue) => {
        formData.append(key, insideValue);
      });
    } else {
      if (value === undefined) return;
      formData.append(key, value);
    }
  });

  return formData;
}

export default createFormData;
