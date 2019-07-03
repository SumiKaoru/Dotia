// @flow
import React from 'react';
import styled from 'styled-components';

import HeaderContainer from 'containers/base/HeaderContainer';
import UserContainer from 'containers/user/UserContainer';

const Content = styled.div`
    margin-top: 55px;
`

const User = () => (
    <>
        <HeaderContainer/>
        <Content>
            <UserContainer />
        </Content>
    </>
)


export default User;