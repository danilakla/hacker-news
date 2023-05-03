import React, {PropsWithChildren} from 'react';

import Header from '../../components/common/header/Header';

import { LayoutBackground } from './styles';

const MainLayout: React.FC<PropsWithChildren<any>> = ({ children }) => (
  <LayoutBackground>
    <Header />
    <div>{children}</div>
  </LayoutBackground>
);

export default MainLayout;
