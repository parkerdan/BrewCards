'use strict'

import React from 'react';
import BarsMain from '../bars/BarsMain';
import BarDetail from '../bars/BarDetail';
import Settings from '../settings/Settings';
import Recipe from '../bars/Recipe';

import * as routes from './routes';


export default function renderScene( data ){
  switch (data.scene.route.key) {
    case routes.BarsMain.key:
    return <BarsMain />
      break;

    case routes.Settings.key:
    return <Settings />
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
