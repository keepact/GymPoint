import React from 'react';

import { View } from 'react-native';

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Loader,
} from 'rn-placeholder';

export default ({ left = false, bottom = true, style = {} }) => (
  <Placeholder
    Animation={Loader}
    style={style}
    Left={left ? PlaceholderMedia : null}>
    <PlaceholderLine width={50} height={20} />
    <PlaceholderLine height={10} />
    <PlaceholderLine height={14} />
    <PlaceholderLine height={14} />

    {bottom && (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <PlaceholderLine width={30} />
        <PlaceholderLine width={30} />
      </View>
    )}
  </Placeholder>
);
