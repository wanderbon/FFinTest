import React from 'react';
import { View } from 'react-native';
import styles from './AnimatableCard.styles';
import Animated from 'react-native-reanimated';
import useLogic from './AnimatebleCard.useLogic';

const renderLabelsBlock = ({ info, type = '', animatedStyles = null }) => (
  <Animated.View style={styles.labelsBlock}>
    {type === 'full' && (
      <Animated.Text style={[styles.label, animatedStyles]}>
        {info.fullText}
      </Animated.Text>
    )}
    {type === 'short' && (
      <Animated.Text style={[styles.label, animatedStyles]}>
        {info.shortText}
      </Animated.Text>
    )}
  </Animated.View>
);

const AnimatableCard = ({ info, translation, index, contentHeight }) => {
  const {
    bottomAnimatedStyle,
    topAnimatedStyle,
    shortTopCardTextStyles,
    shortBottomCardTextStyles,
    fullTopCardTextStyles,
    fullBottomCardTextStyles,
  } = useLogic({
    translation,
    contentHeight,
  });

  return (
    <Animated.View
      style={[
        styles.container,
        index ? bottomAnimatedStyle : topAnimatedStyle,
      ]}>
      <View style={[styles.card, { backgroundColor: info.color }]} />
      {renderLabelsBlock({
        info,
        type: 'full',
        animatedStyles: !index
          ? fullTopCardTextStyles
          : fullBottomCardTextStyles,
      })}
      {renderLabelsBlock({
        info,
        type: 'short',
        animatedStyles: !index
          ? shortTopCardTextStyles
          : shortBottomCardTextStyles,
      })}
    </Animated.View>
  );
};

export default AnimatableCard;
