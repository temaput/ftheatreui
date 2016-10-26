
const ERROR_TYPES = [
  'customError',
  'patternMismatch',
  'valueMissing',
  'typeMismatch',
]

export function  validateFormField(fieldNode, customErrorMessages={}) {
  if (!fieldNode.checkValidity()) {
    const {validity} = fieldNode;
    const customMessageKey = ERROR_TYPES.find(
      errType => validity[errType] && customErrorMessages[errType]
    );
    if (customMessageKey) {
      return customErrorMessages[customMessageKey];
    } else {
      return fieldNode.validationMessage
    }
  }
}
