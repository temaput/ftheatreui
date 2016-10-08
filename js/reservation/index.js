import './reservation.scss';
import React from 'react';
import ReactDOM from 'react-dom';

import Main from './components/Main';
import {DocumentIds} from './constants.js';

function getPrescribedData() {
  const prescribedData =  JSON.parse(
    document.getElementById(DocumentIds.PRESCRIBED_DATA).textContent
  );
  return prescribedData;
}

document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    const prescribedData = getPrescribedData();
    ReactDOM.render(
      <Main prescribedData={prescribedData} />,
      document.getElementById(DocumentIds.ROOT_ELEMENT)
    );
  }
};

