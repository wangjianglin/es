'use strict';

const NavigationExampleRow = require('../main/NavigationExampleRow');
const React = require('react');
const ReactNative = require('react-native');

/**
 * Basic example that shows how to use <NavigationCardStack /> to build
 * an app with composite navigation system.
 */

const {
  Component,
  PropTypes,
} = React;

const {
  NavigationExperimental,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = ReactNative;

const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
  PropTypes: NavigationPropTypes,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

export default class H extends Component {
  // static propTypes = {
  //   ...NavigationPropTypes.SceneRendererProps,
  //   navigate: PropTypes.func.isRequired,
  // };

  constructor(props: Object, context: any) {
    super(props, context);
    this._exit = this._exit.bind(this);
    this._popRoute = this._popRoute.bind(this);
    this._pushRoute = this._pushRoute.bind(this);
    this._press = this._press.bind(this);
  }

  _press(){
        // console.log('======')
        // console.log(this);
        // console.log(this.props);
        // this.props.navigate.push({
        //       title: 'Very Long Custom View Example Title',
        //       component: Detial,
        //     });
        const route = {key: '[]-' + Date.now()};
        this.props.navigate({type: 'push', route});
        // this.props.navigate.push(route);
          
    }

  render(): ReactElement {
    return (
      <ScrollView>
        <NavigationExampleRow
          text="Push Route"
          onPress={this._pushRoute}
        />
        <NavigationExampleRow
          text="Pop Route"
          onPress={this._popRoute}
        />
        <NavigationExampleRow
          text="Exit Header + Scenes + Tabs Example"
          onPress={this._exit}
        />

        <TouchableOpacity onPress={this._press}>
            <View><Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
        </View>        
        </TouchableOpacity>    

      </ScrollView>
    );
  }

  _pushRoute(): void {
    // Just push a route with a new unique key.
    const route = {key: '[' + this.props.scenes.length + ']-' + Date.now()};
    this.props.navigate({type: 'push', route});
  }

  _popRoute(): void {
    this.props.navigate({type: 'pop'});
  }

  _exit(): void {
    this.props.navigate({type: 'exit'});
  }
}