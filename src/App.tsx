import React, { Component } from 'react';
import { createConnection } from 'typeorm/browser';

import LandingPage from '~views/LandingPage';

import {
  CentreDeSante,
  Diagnostic,
  Fichier,
  Intervention,
  InterventionProcedure,
  Patient,
  Procedure,
} from '~models';

export default class App extends Component {
  constructor(props: any) {
    super(props);
    this.init();
  }

  init() {
    createConnection({
      type: 'react-native',
      database: 'patients.db',
      location: 'default',
      logging: ['error', 'query', 'schema'],
      dropSchema: true,
      synchronize: true,
      entities: [
        CentreDeSante,
        Diagnostic,
        Fichier,
        Intervention,
        InterventionProcedure,
        Patient,
        Procedure,
      ],
    });
  }

  render() {
    return (
      <LandingPage />
    );
  }
};
