'use strict';

import React, { Component} from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
  Dimensions,
  Image,
 } from 'react-native';

import clamp from 'clamp';

const { height,width } = Dimensions.get('window');
const SWIPE_THRESHOLD = 120;

import ImageArray from '../images/ImageArray'

export default class CardSwiper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      cardWidth:0,
      hopHeight: 0,
    };
  };

  nextCard = (swipeDirection) => {
    let index = this.props.index;
    let totalCards = this.props.cards.length;
    var newIndex;
     if (index + swipeDirection === -1) {
       newIndex = totalCards - 1;
     } else if (index + swipeDirection === totalCards) {
       newIndex = 0;
     } else {
       newIndex = index + swipeDirection;
     }

    this.props.changeIndex(newIndex)
  };

  componentDidMount() {
    this.animateEntrance();
  }

  animateEntrance = () => {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start();
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        // vx >= 0 is right swipe )
        this.state.pan.flattenOffset();
        var velocity;
        var swipeDirection;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
          swipeDirection = 1;
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
          swipeDirection = -1;
        }

        if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98
          }).start( () => this.resetState(swipeDirection) )
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
      }
    })
  };

  resetState = (swipeDirection) => {
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    this.nextCard(swipeDirection);
    this.animateEntrance();
  };

  addOpactiy = (rgb) => {
    var result = rgb.replace(')', ', .3)').replace('rgb', 'rgba');
    return result
  };

  render() {
    let { pan, enter, } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]})
    let scale = enter;

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

    let images = [];
    for (var i = 0; i < this.props.cards[this.props.index].hoppiness; i++) {
      images.push(
        <View key={i}
          style={{width:this.state.cardWidth/10,height:this.state.hopHeight}}
        >
          <Image
            source={require('../images/hops.png')}
            resizeMode={'contain'}
          />
        </View>
      )
    }


    return (
      <View style={{
        flex:1,
        backgroundColor: this.addOpactiy(this.props.cards[this.props.index].backgroundColor),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Animated.View
          {...this._panResponder.panHandlers}
          onLayout={
            (e) => this.setState({cardWidth: e.nativeEvent.layout.width})
          }
          style={[
            animatedCardStyles,
            {
              backgroundColor: this.props.cards[this.props.index].backgroundColor,
              width: (width * .95),
              height: ((height - 55) * .95),
              borderRadius: 10,
              flexDirection:'column'
            }]}>
          <View style={{
            flex: 1,
            paddingVertical: 5,
            overflow:'hidden'
          }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 33,
                color: this.props.cards[this.props.index].textColor
              }}>
              {this.props.cards[this.props.index].title}
            </Text>
          </View>

          <View
            onLayout={
              (e) => this.setState({hopHeight:(e.nativeEvent.layout.height - 4)/2})
            }
            style={{
              flex:1,
              paddingVertical:2,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems:'center',
              justifyContent:'center'
            }}>
            {images}
          </View>

          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Image
              source={ ImageArray[this.props.cards[this.props.index].imageId] }
            />
          </View>

          <View style={{
            flex: 1,
            paddingVertical:5,
            overflow:'hidden',
          }}>
            <Text style={{
              fontSize:22,
              textAlign:'center',
              color: this.props.cards[this.props.index].textColor
            }}>
              {this.props.cards[this.props.index].description}
             </Text>
           </View>
        </Animated.View>

      </View>
    );
  }
}
