'use strict'

import React from 'react';
import BarsMain from '../../screens/bars/BarsMain';
import SettingsMain from '../../screens/settings/SettingsMain';

import * as routes from './routes';


export default function renderScene( data ){
  switch (data.scene.route) {
    case routes.BarsMain:
    return <BarsMain />
      break;
      case routes.SettingsMain:
      return <SettingsMain />
        break;

    default:
    return <BarsMain />

  }

}
