import './reservation.scss';
import React from 'react';
import ReactDOM from 'react-dom';

import Main from './components/Main';
import {DocumentIds} from './constants.js';

function getPredefinedData() {
  const prescribedData =  JSON.parse(
    document.getElementById(DocumentIds.PREDEFINED_DATA).textContent
  );
  return prescribedData;
}

document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    const predefinedData = getPredefinedData();
    ReactDOM.render(
      <Main predefinedData={predefinedData} />,
      document.getElementById(DocumentIds.ROOT_ELEMENT)
    );
  }
};

