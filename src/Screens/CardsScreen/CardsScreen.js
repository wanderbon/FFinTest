import React from 'react';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import cards from '../../data/cards';
import styles from './CardsScreen.styles';
import useLogic from './CardsScreen.useLogic';

const CardsScreen = () => {
  const { gestureHandler, changeContentHeight, renderCard } = useLogic();

  return (
    <PanGestureHandler
      shouldCancelWhenOutside={false}
      minDist={0}
      onGestureEvent={gestureHandler}>
      <Animated.View style={styles.container} onLayout={changeContentHeight}>
        {cards.map(renderCard)}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default CardsScreen;
