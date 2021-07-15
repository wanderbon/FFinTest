import { withTiming, Easing } from 'react-native-reanimated';

export const clamp = (value, lowerBound, upperBound) => {
  'worklet';
  return Math.min(Math.max(lowerBound, value), upperBound);
};

export const CARD_HEIGHT = 150;

export const getSnapPoints = contentHeight => {
  'worklet';
  return [0, contentHeight - CARD_HEIGHT];
};

export const getTiming = toValue => {
  'worklet';

  return withTiming(toValue, {
    duration: 200,
    easing: Easing.linear,
  });
};
