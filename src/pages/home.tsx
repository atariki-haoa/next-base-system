import Layout from '@/components/common/Layout';
import React, { useEffect } from 'react';

const Home: React.FC = () => {
  useEffect(() => {
    console.log('Hello, world!');
  }, []);

  return (
    <Layout>
      <h1>Welcome to my website!</h1>
      <p>Thanks for visiting.</p>
    </Layout>
  );
};

export default Home;
