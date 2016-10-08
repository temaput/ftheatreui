const Queries = {
  getShowsByPPAndDate: (performancePk, placePk, showtimeDate) => ({
    query: `
        query QueryShows(
            $performancePk: String,
            $placePk: String,
            $showtimeDate: String,
            ) {
            show:shows(
              performancePk: $performancePk,
              placePk: $placePk
            ) {
                        id showtime:showtimeStamp price
            }
            showByDate:shows(
              performancePk: $performancePk,
              placePk: $placePk,
              showtimeDate: $showtimeDate
            ){
                        id showtime:showtimeStamp price
            }
        }
  `,
    variables: {performancePk, placePk, showtimeDate},
  }),

  performancesByPlace: (pk) => ({
    query: `
          query QueryPerformancesByPlace ($pk:String){
              performance:performancesByPlace(pk: $pk) {
                          id title
              }
          }
  `,
    variables: {pk},
  }),

  placesByPerformance: (pk) =>({
    query: `
          query QueryPlacesByPerformance($pk:String){
              place:placesByPerformance(pk: $pk) {
                          id title
              }
          }
  `,
    variables: {pk},
  }),

  scheduledPerformances: () => ({
    query:`
    query QueryScheduledPerformances {
      performance:scheduledPerformances {
        id title
      }
    }
    `,
  }),

  scheduledPlaces: () => ({
    query:`
    query QueryScheduledPlaces {
      place:scheduledPlaces {
        id title
      }
    }
    `,
  }),

}

export default Queries;
