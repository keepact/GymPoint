import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';

import { AnimationContainer } from './styles';

function LottieControl({ animation, width, height, loop, autoplay }) {
  const [isStopped, setStopped] = useState(false);
  const [isPaused, setPaused] = useState(false);

  const defaultOptions = {
    loop,
    autoplay,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <AnimationContainer>
      <Lottie
        options={defaultOptions}
        isStopped={isStopped}
        isClickToPauseDisabled
        isPaused={isPaused}
        height={height}
        width={width}
      />
    </AnimationContainer>
  );
}

LottieControl.defaultProps = {
  width: 300,
  height: 300,
  loop: true,
  autoplay: true,
};

LottieControl.propTypes = {
  animation: PropTypes.oneOfType([PropTypes.object]).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  loop: PropTypes.bool,
  autoplay: PropTypes.bool,
};

export default LottieControl;
