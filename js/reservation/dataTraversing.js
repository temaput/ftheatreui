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
export function getObjectFields(dataStore, objectName) {
  return dataStore[objectName].fields;
}

export function getFieldById(fieldsList, id) {
  return fieldsList.find(f => f.id === id);
}

export function fieldsListToDict(fieldsList) {
  const fieldsDict = {};
  fieldsList.forEach(f => {
    const {id, ...props} = f;
    fieldsDict[id] = props;
  });
  return fieldsDict;
}

export function getFieldsValues(fieldsDict) {
  const fieldsValues = {};
  Object.keys(fieldsDict).forEach(
    fname => fieldsValues[fname] = fieldsDict[fname].value
  );
  return fieldsValues;
}

function prepareObject(dataStore, step, objName) {
  const objTemplate = dataStore[objName];
  const {fields} = objTemplate;
  const newObject = {
    type: objName, props: {fields: JSON.parse(JSON.stringify(fields))}
  };
  const {hiddenFields} = step;
  hiddenFields.forEach(
    fname => {
      const field = getFieldById(newObject.props.fields, fname); 
      if (field) {
        field.hidden = true
      }
    }
  );
  return newObject;

}

export function getStepObjects(dataStore, step) {
  return step.data.map(objName => prepareObject(dataStore, step, objName));
}

export function getCurrentStepObjects(dataStore) {
  return getStepObjects(dataStore, getCurrentStep(dataStore.steps));
}

export function getFilterFields(dataStore) {
  const fieldsList = getObjectFields(dataStore, "ScheduleFilterForm");
  return fieldsListToDict(fieldsList);
}

export function getFilterFieldsValues(dataStore) {
  const filterFields = getFilterFields(dataStore);
  return getFieldsValues(filterFields);
}

