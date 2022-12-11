import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 20px;
`;

export const Card = styled.View`
    background-color: #f8f8f8;
    width: 100%;
    margin-bottom: 20px;
    border-radius: 10px;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    margin-top: 70px;
`;

export const UserImg = styled.Image`
    width: 30px;
    height: 30px;
    border-radius: 25px;
`;

export const UserInfoText = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;
    padding-left: 5px;
`;

export const UserName = styled.Text`
    font-size: 14px;
  
`;

export const Interaction = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    border-radius: 5px;
    padding: 2px 5px;
    background-color: ${props => props.active ? '#2e64e515' : 'transparent'}
`;

export const InteractionText = styled.Text`
    font-size: 12px;

    color: ${props => props.active ? '#2e64e5' : '#333'};
    margin-top: 5px;
    margin-left: 5px;
`;

export const DelButton = styled.View`
    position: 'absolute';
    right: 25px;
    bottom: 91px;
`;