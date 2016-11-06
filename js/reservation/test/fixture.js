export const testSamples = {
  stepsData: [
    [
      {
        type: 'ScheduleFilterForm',
        props: {
          fields: [
            {
              id: 'performance',
              hidden: true,
              value: "1",
            },
            {
              id: 'place',
              options: [],
              value: "2",
              required: true,
              label: 'Выберите спектакль',
              error: null,
              customErrorMessages: {
                valueMissing: 'Обязательно выберите площадку'
              },
            },
          ],
        },
      },
      {
        type: 'ShowSelect',
        props: {
          fields: [
            {
              id: 'show',
              options: [],
              value: "3",
              required: true,
              label: 'Выберите показ',
              error: null,
              customErrorMessages: {
                valueMissing: 'Обязательно выберите показ'
              },
            },
          ],
        }
      },
    ],
    [
      {
        type: 'ReservationForm',
        props: {
          fields: [
            {
              id: 'email', label: "email", type: "email", required: true,
              value: "",
            }, 
            {
              id: 'firstName', label: "Имя",
              value: "",
            },
            {
              id: 'lastName', label: "Фамилия",
              value: "",
            },
            {
              id: 'tel', label: "Мобильный телефон", pattern: "[\d]{5,20}",
              value: "",
            }, 
            {
              id: 'childrenSeats', value: 1, type: "number", label: "Дети",
              hidden: true,
            },
            {
              id: 'adultSeats', value: 1, type: "number", label: "Взрослые",
              hidden: true,
            }
          ],
        },
      },
    ],
    [
      {
        type: 'ReservationForm',
        props: {
          fields: [
            {
              id: 'email', label: "email", type: "email", required: true,
              value: "",
              hidden: true,
            }, 
            {
              id: 'firstName', label: "Имя",
              value: "",
              hidden: true,
            },
            {
              id: 'lastName', label: "Фамилия",
              value: "",
              hidden: true,
            },
            {
              id: 'tel', label: "Мобильный телефон", pattern: "[\d]{5,20}",
              value: "",
              hidden: true,
            }, 
            {
              id: 'childrenSeats', value: 1, type: "number", label: "Дети",
            },
            {
              id: 'adultSeats', value: 1, type: "number", label: "Взрослые",
            }
          ],
        },
      },
    ],
  ]
}
export const dataStore = {
  ScheduleFilterForm: {
    fields: {
      performance: {
        id: 'performance',
        value: "1",
        required: true,
        label: 'Выберите спектакль',
        error: null,
        fieldIndex: 0,

      },
      place: {
        id: 'place',
        options: [],
        value: "2",
        required: true,
        label: 'Выберите спектакль',
        error: null,
        customErrorMessages: {valueMissing: 'Обязательно выберите площадку'},
        fieldIndex: 1,
      },
    },
  },
  ShowSelect: {
    fields: {
      show: {
        id: 'show',
        options: [],
        value: "3",
        required: true,
        label: 'Выберите показ',
        error: null,
        customErrorMessages: {valueMissing: 'Обязательно выберите показ'},
      },
    },
  },
  ReservationForm: {
    fields: {
      show: {
        id: 'show', hidden: true, required: true, value: "",
      }, 
      email: {
        id: 'email', label: "email", type: "email", required: true,
        value: "", fieldIndex: 0,
      }, 
      firstName: {
        id: 'firstName', label: "Имя",
        value: "", fieldIndex: 1,
      },
      lastName: {
        id: 'lastName', label: "Фамилия",
        value: "", fieldIndex: 2,
      },
      tel: {
        id: 'tel', label: "Мобильный телефон", pattern: "[\d]{5,20}",
        value: "", fieldIndex: 3,
      }, 
      childrenSeats: {
        id: 'childrenSeats', value: 1, type: "number", label: "Дети", 
        fieldIndex: 4,
      },
      adultSeats: {
        id: 'adultSeats', value: 1, type: "number", label: "Взрослые", 
        fieldIndex: 5,
      }
    },
  },
  steps: [
    {
      number: 1,
      isCurrent: true,
      isComplete: false,
      label: "Выберите сеанс",
      hasFinish: false,
      hasPrevious: false,
      data: [
        'ScheduleFilterForm',
        'ShowSelect',
      ],
      hiddenFields: [
        'performance',
      ],
    },
    {
      number: 2,
      isCurrent: false,
      isComplete: false,
      label: "Укажите контактные данные",
      hasFinish: false,
      hasPrevious: true,
      data: [
        'ReservationForm',
      ],
      hiddenFields: [
        'show', 'childrenSeats', 'adultSeats'
      ],
    },
    {
      number: 3,
      isCurrent: false,
      isComplete: false,
      label: "Подтверждение брони",
      hasFinish: true,
      hasPrevious: true,
      data: [
        'ReservationForm',
      ],
      hiddenFields: [
        'show', 'email', 'tel', 'firstName', 'lastName',
      ],
    },
  ],
}

export const serverData = {
  ScheduleFilterForm: {
    fields: [
      {
        id: 'performance',
        value: "1",
      },
      {
        id: 'place',
        options: [],
        value: "2",
        required: true,
        label: 'Выберите спектакль',
        error: null,
        customErrorMessages: {valueMissing: 'Обязательно выберите площадку'},
      },
    ],
  },
  ReservationForm: {
    fields: [
      {
        id: 'email', label: "email", type: "email", required: true,
        value: "",
      }, 
      {
        id: 'firstName', label: "Имя",
        value: "",
      },
      {
        id: 'lastName', label: "Фамилия",
        value: "",
      },
      {
        id: 'tel', label: "Мобильный телефон", pattern: "[\d]{5,20}",
        value: "",
      }, 
      {
        id: 'childrenSeats', value: 1, type: "number", label: "Дети",
      },
      {
        id: 'adultSeats', value: 1, type: "number", label: "Взрослые",
      }
    ],
  },
}


export const formMock = `
<html>
  <body>
    <form action="#" id="mock-form">
      <div>
        <label htmlFor="email"></label>
        <input id="email" type="email" required>
      </div>
    </form>
  </body>
</html>
`;
export const formMockId = 'mock-form';
