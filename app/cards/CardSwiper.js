'use strict';

// React
import React from 'react';
import { View, Text, Animated, PanResponder, Image } from 'react-native';
import clamp from 'clamp';

// Views
import ImageArray from '../images/ImageArray';

//Styles
import { card } from '../styles/card';

const SWIPE_THRESHOLD = 120;


export default class CardSwiper extends React.Component {
  constructor() {
    super();
    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
    };
  };

  componentWillMount() {
    //  code yanked from here and modified https://github.com/brentvatne/react-native-animated-demo-tinder

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

  componentDidMount() {
    this.animateEntrance();
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

  animateEntrance = () => {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start();
  };

  resetState = (swipeDirection) => {
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0.2);
    this.nextCard(swipeDirection);
    this.animateEntrance();
  };

  render() {
    let { pan, enter } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]});
    let scale = enter;

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

    let images = [];

    let { cards, index } = this.props;

    for (var i = 0; i < cards[index].hoppiness; i++) {
      images.push(
        <View key={i} style={ card.hopImage }>
          <Image source={ require('../images/hops.png') } resizeMode={'contain'}/>
        </View>
      )
    }


    return (
      <View style={[card.container,{
        backgroundColor: this.props.addOpacity(this.props.cards[this.props.index].backgroundColor),
      }]}
      >
        <Animated.View
          {...this._panResponder.panHandlers}
          style={[
            animatedCardStyles,
            card.card,
            { backgroundColor: cards[index].backgroundColor } ]}
        >

          <View style={ card.textContainer }>
            <Text style={[ card.titleText,{color: cards[index].textColor} ]}>
              { cards[index].title }
            </Text>
          </View>

          <View style={ [card.imageContainer,card.hopImageContainer] }>
            {images}
          </View>

          <View style={ card.imageContainer }>
            <Image source={ ImageArray[cards[index].imageId] }/>
          </View>

          <View style={ card.textContainer }>
            <Text style={[ card.detailText,{color: cards[index].textColor} ]}>
              {cards[index].description}
            </Text>
          </View>

        </Animated.View>
      </View>
    );
  }
}
