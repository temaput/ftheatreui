import React from 'react';
import classNames from 'classnames';
import SelectField from '../../utils/MDLComponents/SelectField.js';
import WebAPI from '../WebAPI.js';
import {Fragments} from '../Queries.js';
import {FilterModes} from '../constants.js';

const defaultListing = `
          performance { ...field, ...options }
          place { ...field, ...options }
          show { ...field, ...options }
`;


function getData(variables, fieldListing=defaultListing) {
  return WebAPI.runQuery(
    {
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
    }
  )
}

function FormComponent({mode, performance, place, show, ...handleEvents}) {
  if (mode.stepByStep && mode.performanceFirst) {
    const placeType = performance.value === null ? 'hidden': place.type;
    const showType = place.value === null ? 'hidden': show.type;
    return (
      <Form {...handleEvents} >
        <Select {...performance} />
        {place && <Select {...place} />}
        {show && <Select {...show} />}
      </Form>
    )

  } else if (mode.stepByStep && mode.placeFirst) {
    const performanceType = place.value === null ? 'hidden': performance.type;
    const showType = performance.value === null ? 'hidden': show.type;
    return (
      <Form {...handleEvents} >
        <Select {...place} />
        {performance && <Select {...performance} />}
        {show && <Select {...show} />}
      </Form>
    )

  } else if (!mode.stepByStep && !mode.dateFilter) {
    return (
      <Form {...handleEvents} >
        <Select {...performance} />
        <Select {...place} />
      </Form>
    )
  }

}

function fieldListing({mode, performance, place, show}) {

  let l = [];
  if (mode.stepByStep) {
    if (mode.performanceFirst) {
      l.push("performance {...attrs, ...options}");
      if (performance.value) {
        l.push("place {...attrs, ...options}");
      }
      if (place.value && mode.selectShow) {
        l.push("show {...attrs, ...options}")
      } 
    } else if (mode.placeFirst) {
      l.push("place {...attrs, ...options}");
      if (place.value) {
        l.push("performance {...attrs, ...options}");
      }
      if (performance.value && mode.selectShow) {
        l.push("show {...attrs, ...options}")
      }
    }
  } else if (mode.dateFilter === null && !mode.selectShow) {
    l.push("performance {...attrs, ...options} place {...attrs, ...options}");
  }
  return l.join()
}

export default class ScheduleFilterForm extends React.Component {

  constructor() {
    super();
    const mode = this.props.mode || FilterModes.defaultMode;
    this.state = { mode };
    this.onSubmit = this.handleSubmit.bind(this)
    this.onInput = this.handleInput.bind(this)
  }

  handleSubmit() {
  }

  getVariables(nextState) {
    const proxyState = {...this.state, ...nextState};
    const variables = {mode: proxyState.mode.name};
    variables.performance = proxyState.performance.value;
    variables.place = proxyState.place.value;
    return variables;
  }

  handleInput(fref, fname, value) {
    const nextState = {};
    nextState[fname].value = value;
    nextState[fname].errors = errors;
    this.setState(nextState);
    if (errors === null) {
      const variables = this.getVariables(nextState);
      getData(variables, fieldListings(this.state)).then(
        nextData => this.setState(nextData)
      );
    }


    
  }

  render() {
    return (
      <FormComponent {...this.state} 
        onSubmit={this.onSubmit}
        onInput={this.onInput}
      />
    )

  }

  

}
