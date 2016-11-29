const Fragments = {
  fieldAttrs: `
    fragment field on FormFieldObject {
      id type value label helpText disabled required 
      maxlength 
      customErrorMessages {valueMissing typeMismatch}
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
