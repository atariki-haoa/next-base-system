import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

import Footer from './Footer';
import Menu from './Menu';

type LayoutProps = {
  children: ReactNode;
};

const Container = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const ChildContainer = styled(Box)({
  padding: '50px',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'calc(100vh - 300px)',
  overflow: 'auto',
  width: '90%',
});

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Menu />
      <Container>
        <ChildContainer component="main">
          {children}
        </ChildContainer>
      </Container>
      <Footer />
    </>
  );
}

export default Layout;
