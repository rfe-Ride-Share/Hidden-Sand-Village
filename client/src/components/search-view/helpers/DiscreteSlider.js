import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider({ filterType }) {
  return (
    <Box sx={{ width: 300 }}>
      <Typography sx={{ p: 4, color: 'text.primary', margin: 0 }}>
        {filterType}
      </Typography>
      <Slider
        aria-label="Temperature"
        defaultValue={30}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={110}
      />
    </Box>
  );
}
