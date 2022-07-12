export const handleValidation = (itemToValidate) => {
  let errors = {};

  const { title, endDate } = itemToValidate;

  if (!title) errors = { ...errors, title: "A title is required" };
  if (!endDate) errors = { ...errors, endDate: "An endDate is required" };

  const hasErrors = !!Object.keys(errors).length;
  console.log("hasErrors", hasErrors);

  return { hasErrors, errors };
};
