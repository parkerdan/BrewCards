'use strict'

import React from 'react';
import BarsMain from '../../screens/bars/BarsMain';
import BarDetail from '../../screens/bars/BarDetail';
import SettingsMain from '../../screens/settings/SettingsMain';
import Recipe from '../../screens/bars/Recipe';

import * as routes from './routes';


export default function renderScene( data ){
  switch (data.scene.route.key) {
    case routes.BarsMain.key:
    return <BarsMain />
      break;

    case routes.SettingsMain.key:
    return <SettingsMain />
      break;

    case routes.BarDetail.key:
    return <BarDetail {...data.scene.route} />
      break;

    case routes.Recipe.key:
    return <Recipe {...data.scene.route} />
      break;

    default:
    return <BarsMain />

  }

}
