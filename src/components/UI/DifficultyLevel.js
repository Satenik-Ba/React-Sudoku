import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import NativeSelect from '@mui/material/NativeSelect';

const easy = Math.floor(Math.random() * 10 + 40);
const medium = Math.floor(Math.random() * 10 + 50);
const hard = Math.floor(Math.random() * 10 + 60);

const DifficultyLevel = ({ gameDifficultyLevel }) => {

  const handleChange = (e) => {
    if (e.target.value === 'easy') {
      gameDifficultyLevel(easy);;
    } else if (e.target.value === 'medium') {
      gameDifficultyLevel(medium);
    } else if (e.target.value === 'hard') {
      gameDifficultyLevel(hard);
    }
  };

  return (
    <Box sx={{ minWidth: 50 }}>
      <div>
        <label>Difficulty </label>
        <NativeSelect onChange={handleChange}>
          <option value={'easy'}>Easy</option>
          <option value={'medium'}>Medium</option>
          <option value={'hard'}>Hard</option>
        </NativeSelect>
      </div>
    </Box>
  );
};
export default DifficultyLevel;
