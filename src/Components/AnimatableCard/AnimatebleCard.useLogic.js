import { useAnimatedStyle } from 'react-native-reanimated';
import { interpolate, Extrapolate } from 'react-native-reanimated';
import { CARD_HEIGHT } from '../../Utils/utils';

const useLogic = ({ contentHeight, translation }) => {
  const topAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            translation.value,
            [0, contentHeight * 0.25, -CARD_HEIGHT / 2 + contentHeight * 0.5],
            [
              -CARD_HEIGHT / 2,
              contentHeight * 0.25 - CARD_HEIGHT / 2,
              contentHeight * 0.25,
            ],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [contentHeight]);

  const bottomAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            translation.value,
            [0, contentHeight * 0.25, contentHeight - CARD_HEIGHT],
            [
              contentHeight * 0.25 - CARD_HEIGHT,
              contentHeight * 0.25 + (contentHeight * 0.25 - CARD_HEIGHT),
              contentHeight - CARD_HEIGHT - CARD_HEIGHT * 0.25,
            ],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [contentHeight]);

  const shortTopCardTextStyles = useAnimatedStyle(() => {
    return {
      top: interpolate(
        translation.value,
        [0, contentHeight * 0.25, contentHeight - CARD_HEIGHT],
        [CARD_HEIGHT / 2 + 32, CARD_HEIGHT / 2 + 32, contentHeight * 0.25],
        Extrapolate.clamp,
      ),
      opacity: interpolate(
        translation.value,
        [0, contentHeight * 0.25 - CARD_HEIGHT / 2, contentHeight * 0.25],
        [1, 1, 0],
        Extrapolate.clamp,
      ),
    };
  }, [contentHeight]);

  const shortBottomCardTextStyles = useAnimatedStyle(() => {
    return {
      top: interpolate(
        translation.value,
        [0, contentHeight - CARD_HEIGHT * 2],
        [0, -CARD_HEIGHT / 2],
        Extrapolate.clamp,
      ),
      opacity: interpolate(
        translation.value,
        [
          0,
          contentHeight - CARD_HEIGHT - CARD_HEIGHT / 2,
          contentHeight - CARD_HEIGHT,
        ],
        [0, 0, 1],
        Extrapolate.clamp,
      ),
    };
  }, [contentHeight]);

  const fullTopCardTextStyles = useAnimatedStyle(() => {
    return {
      top: interpolate(
        translation.value,
        [0, contentHeight * 0.25, contentHeight - CARD_HEIGHT / 2 + 16],
        [0, 0, CARD_HEIGHT],
        Extrapolate.clamp,
      ),
      opacity: interpolate(
        translation.value,
        [0, contentHeight * 0.25, contentHeight - CARD_HEIGHT * 2],
        [0, 1, 1],
        Extrapolate.clamp,
      ),
    };
  }, [contentHeight]);

  const fullBottomCardTextStyles = useAnimatedStyle(() => {
    return {
      top: interpolate(
        translation.value,
        [0, contentHeight * 0.25, contentHeight - CARD_HEIGHT],
        [CARD_HEIGHT - 32, CARD_HEIGHT - 32, contentHeight - CARD_HEIGHT],
        Extrapolate.clamp,
      ),
      opacity: interpolate(
        translation.value,
        [0, contentHeight * 0.25, contentHeight - CARD_HEIGHT * 3],
        [1, 0.5, 0],
        Extrapolate.clamp,
      ),
    };
  }, [contentHeight]);

  return {
    topAnimatedStyle,
    bottomAnimatedStyle,
    shortTopCardTextStyles,
    shortBottomCardTextStyles,
    fullTopCardTextStyles,
    fullBottomCardTextStyles,
  };
};

export default useLogic;
