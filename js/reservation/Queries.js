export function fieldListing(fieldsList, fragmentList) {
  return fieldsList.map(fname => {
    const fragments = fragmentList.map(fragName => `...${fragName}`).join(', ');
    return `
      ${fname} { ${fragments} }
    `;
  }).join('');
}

const FieldListings = {
  scheduleFilterInitial: `
    performance {
      ...field,
      ...options
    }
    place {
      ...field,
      ...options
    }
    show {
      ...field,
      ...options
    }
  `,
  scheduleFilterOptions: `
    performance {
      ...options
    }
    place {
      ...options
    }
    show {
      ...options
    }
  `,
  scheduleFilterValidation: `
    performance {
      ...validation
    }
    place {
      ...validation
    }
    show {
      ...validation
    }
  `,
  userForm: `
    email {
      ...field
    }
    tel {
      ...field
    }
    firstName {
      ...field
    }
    lastName {
      ...field
    }
  `,

  reservationForm: `
  `,
}
const Fragments = {
  fieldAttrs: `
    fragment field on FormFieldObject {
      id type value label helpText disabled required 
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
const Queries = {

  reservationForm: (variables, fieldListing) => ({
    query: `
      query ReservationForm(
        $performance: String,
        $place: String,
        $show: String
      ) {
        reservationForm(
          performance: $performance,
          place: $place,
          show: $show
        ) {
          ${fieldListing}
        }
      }

    ${Fragments.fieldAttrs}
    `,
    variables,
  }),

  scheduleFilter: (variables, fieldListing) => ({
    query: `
      query ScheduleFilter(
        $performance: String,
        $place: String,
        $mode: String
      ) {
        scheduleFilter(
          performance: $performance,
          place: $place,
          mode: $mode
        ) {
          ${fieldListing}
        }
      }

    ${Fragments.fieldAttrs}
    `,
    variables,
  }),

}

export default Queries;
