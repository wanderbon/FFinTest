/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import {
  useSharedValue,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { AnimatableCard } from '../../Components';
import {
  clamp,
  CARD_HEIGHT,
  getSnapPoints,
  getTiming,
  getDirection,
  DIRECTION,
} from '../../Utils/utils';

const useLogic = () => {
  const { height } = useWindowDimensions();
  const [contentHeight, setContentHeight] = useState(Math.round(height));

  const [snapPoints, setSnapPoints] = useState(getSnapPoints(contentHeight));
  const translation = useSharedValue(0);

  const lastDirection = useSharedValue('NONE');
  const touchStart = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler(
    {
      onStart: (event, ctx) => {
        ctx.startY = translation.value;
        touchStart.value = event.y;

        lastDirection.value = getDirection(event.velocityY);
      },
      onActive: (event, ctx) => {
        lastDirection.value = getDirection(event.velocityY);

        translation.value = clamp(
          ctx.startY + event.translationY,
          0,
          contentHeight - CARD_HEIGHT,
        );
      },
      onEnd: event => {
        lastDirection.value = getDirection(event.y - touchStart.value);

        if (lastDirection.value === DIRECTION.BOTTOM) {
          translation.value = getTiming(snapPoints[1]);
        } else if (lastDirection.value === DIRECTION.TOP) {
          translation.value = getTiming(snapPoints[0]);
        }

        touchStart.value = 0;
        lastDirection.value = DIRECTION.NONE;
      },
    },
    [contentHeight, snapPoints],
  );

  useEffect(() => {
    setSnapPoints(getSnapPoints(contentHeight));
  }, [contentHeight]);

  const renderCard = useCallback(
    (item, index) => {
      return (
        <AnimatableCard
          key={item.id}
          info={item}
          index={index}
          translation={translation}
          contentHeight={contentHeight}
        />
      );
    },
    [contentHeight],
  );

  const changeContentHeight = useCallback(
    ({ nativeEvent: { layout } }) =>
      setContentHeight(Math.round(layout.height)),
    [],
  );

  return {
    gestureHandler,
    changeContentHeight,
    renderCard,
  };
};

export default useLogic;
