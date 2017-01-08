
export const Fragments = {
  fieldAttrs: `
    fragment attrs on FormFieldObject {
      id type label helpText disabled required 
      maxlength 
      customErrorMessages {valueMissing typeMismatch}
    }
    fragment value on FormFieldObject {
      value
    }
    fragment options on FormFieldObject {
      options {label value}
    }
    fragment validation on FormFieldObject {
      error
    }
    fragment textAttrs on FormFieldObject {
      cols rows
    }
    fragment numAttrs on FormFieldObject {
      min max 
    }
  `,

}

