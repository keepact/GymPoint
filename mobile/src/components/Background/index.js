import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

function Background() {
  const { signed } = useSelector(state => state.auth);

  return (
    <>
      {signed && (
        <View
          style={{
            backgroundColor: '#eee',
            position: 'absolute',
            height: 1000,
            width: 1000,
          }}
        />
      )}
    </>
  );
}

export default Background;
