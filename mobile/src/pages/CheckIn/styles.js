import styled from 'styled-components/native';

import { Platform, ActivityIndicator } from 'react-native';
import Button from '~/components/Button';

export const Container = styled.View`
  align-items: center;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 280px;
`;

export const CheckInButton = styled(Button)`
  margin-top: 15px;
  width: 100%;
`;

export const ContainerLoading = styled.View`
  min-height: 100%;
  min-width: 100%;
  border-radius: 5px;
  background-color: #fff;
  margin-top: 30px;
  padding: 10px;
`;

export const LoadingWrapper = styled.View`
  padding: 30px 0;
`;

export const LoadingIndicator = styled(ActivityIndicator).attrs({
  size: Platform.OS === 'ios' ? 'small' : 'large',
  color: '#26408B',
})``;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})``;

export const EmptyContainer = styled.View`
  background-color: #fff;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 100px;
  margin-top: 50px;
`;

export const NoData = styled.Text`
  font-weight: bold;
`;
