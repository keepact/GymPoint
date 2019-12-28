import React from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';

import { AnimationContainer } from './styles';

function LottieControl({ animation, width, height, loop, autoplay }) {
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
        isClickToPauseDisabled
        height={`${height}`}
        width={`${width}`}
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
  width: PropTypes.bool,
  height: PropTypes.bool,
  loop: PropTypes.bool,
  autoplay: PropTypes.bool,
};

export default LottieControl;
