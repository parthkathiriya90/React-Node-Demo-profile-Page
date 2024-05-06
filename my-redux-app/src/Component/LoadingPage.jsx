import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system'; // Import styled from @mui/system

// Create a styled component for the root div
const RootContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

// Loading page component
const LoadingPage = ({ message }) => {
  return (
    <RootContainer>
      <CircularProgress color="primary" />
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        {message || 'Loading...'}
      </Typography>
    </RootContainer>
  );
};

export default LoadingPage;
