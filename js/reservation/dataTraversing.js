export function groupFieldsBySteps(steps, fields) {
  return steps.map(s => {
    const {number} = s;
    return {step: s, fields: fields.filter(
      f => f.customProps.stepNumber === number
    )}
  });
}
export function getFixedFields(fields) {
  return fields.filter(f => f.customProps.isFixed === true)
}
export function getCurrentStep(steps) {
  return steps[getCurrentStepIndex(steps)];
}
function getCurrentStepIndex(steps) {
  return steps.findIndex(
    step => step.isCurrent
  );
}
export function getNextStep(steps) {
  return steps[getCurrentStepIndex(steps) + 1];
}
export function getPreviousStep(steps) {
  return steps[getCurrentStepIndex(steps) - 1];
}
export function getFieldById(fields, id) {
  return fields.find(f => f.id === id);
}
export function getCurrentStepFields(steps, fields) {
  const currentStep = getCurrentStep(steps);
  return fields.filter(
    field => field.step === currentStep.number
  );
}

export function getFilterFields(fields) {
  const filterFields = {place: null, performance: null, show: null};
  Object.keys(filterFields).forEach(
    fname => filterFields[fname] = getFieldById(fields, fname)
  );
  return filterFields;
}

export function getFilterFieldsValues(fields) {
  const filterFields = getFilterFields(fields);
  const filterFieldsValues = {};
  Object.keys(filterFields).forEach(
    fname => filterFieldsValues[fname] = filterFields[fname].value
  );
  return filterFieldsValues;
}
