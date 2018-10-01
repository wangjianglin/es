
'use strict';

import React,{ Component } from 'react';
import {Text,View} from 'react-native'

import Projects from './home/projects'

export  class boot extends React.Component {
    state: {
    //   isLoading: boolean;
      store: any;
    };

    constructor() {
      super();
      this.state = {
      };
    }
    render() {      return (
        <Projects/>
      );
    }
  }

  // return Root;
// }

global.LOG = (...args) => {
  //console.log('/------------------------------\\');
  //console.log(...args);
  //console.log('\\------------------------------/');
  return args[args.length - 1];
};

// module.exports.boot = boot;