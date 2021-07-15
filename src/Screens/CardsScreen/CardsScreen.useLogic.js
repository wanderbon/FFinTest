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
} from '../../Utils/utils';
import { snapPoint } from 'react-native-redash';

const useLogic = () => {
  const { height } = useWindowDimensions();
  const [contentHeight, setContentHeight] = useState(Math.round(height));

  const [snapPoints, setSnapPoints] = useState(getSnapPoints(contentHeight));
  const translation = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler(
    {
      onStart: (_, ctx) => {
        ctx.startY = translation.value;
      },
      onActive: (event, ctx) => {
        translation.value = clamp(
          ctx.startY + event.translationY,
          0,
          contentHeight - CARD_HEIGHT,
        );
      },
      onEnd: event => {
        translation.value = getTiming(
          snapPoint(translation.value, event.velocityY, snapPoints),
        );
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
