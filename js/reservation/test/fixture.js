export const dataStore = {
  fields: [
    {
      id: 'performance',
      hidden: true,
      value: "",
      customProps: {
        stepNumber: 1,
        isFixed: true,
        isShowChanger: true,
      },
    },
    {
      id: 'place',
      options: [],
      value: "",
      required: true,
      label: 'Выберите спектакль',
      error: null,
      customProps: {
        stepNumber: 1,
        isFixed: false,
        isShowChanger: true,
      },
      customErrorMessages: {valueMissing: 'Обязательно выберите площадку'},
    },
    {
      id: 'show',
      options: [],
      value: "",
      required: true,
      label: 'Выберите показ',
      error: null,
      customProps: {
        stepNumber: 1,
        isFixed: false,
        choicesObsolete: false,
      },
      customErrorMessages: {valueMissing: 'Обязательно выберите показ'},
    },
    {
      id: 'email', label: "email", type: "email", required: true,
      value: "",
      customProps: {
        stepNumber: 2,
      },
    }, 
    {
      id: 'firstName', label: "Имя",
      value: "",
      customProps: {
        stepNumber: 2,
      },
    },
    {
      id: 'lastName', label: "Фамилия",
      value: "",
      customProps: {
        stepNumber: 2,
      },
    },
    {
      id: 'tel', label: "Мобильный телефон", pattern: "[\d]{5,20}",
      value: "",
      customProps: {
        stepNumber: 2,
      },
    }, 
    {
      id: 'childrenSeats', value: 1, type: "number", label: "Дети",
      customProps: {
        stepNumber: 3,
      },
    },
    {
      id: 'adultSeats', value: 1, type: "number", label: "Взрослые",
      customProps: {
        stepNumber: 3,
      },
    }
  ],
  steps: [
    {
      number: 1,
      isCurrent: true,
      isComplete: false,
      label: "Выберите сеанс",
      hasFinish: false,
      hasPrevious: false,
    },
    {
      number: 2,
      isCurrent: false,
      isComplete: false,
      label: "Укажите контактные данные",
      hasFinish: false,
      hasPrevious: true,
    },
    {
      number: 3,
      isCurrent: false,
      isComplete: false,
      label: "Подтверждение брони",
      hasFinish: true,
      hasPrevious: true,
    },
  ],
}

