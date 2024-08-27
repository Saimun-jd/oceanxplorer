import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { styled } from "@mui/material/styles";
import { tooltipClasses } from '@mui/material/Tooltip';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background: 'white',
    color: '#003366',
    maxWidth: 300,
    width: 300,
    padding: theme.spacing(2),
    fontSize: theme.typography.pxToRem(16),
    borderRadius: '20px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    border: '2px solid #00BFFF',
    textAlign: 'center',
    transition: 'all 0.3s ease-in-out',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '-20px',
      width: 0,
      height: 0,
      borderTop: '10px solid transparent',
      borderBottom: '10px solid transparent',
      borderRight: '20px solid white',
      transform: 'translateY(-50%)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '-23px',
      width: 0,
      height: 0,
      borderTop: '12px solid transparent',
      borderBottom: '12px solid transparent',
      borderRight: '23px solid #00BFFF',
      transform: 'translateY(-50%)',
    },
  },
}));

export default HtmlTooltip;


