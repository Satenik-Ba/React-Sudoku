import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import NativeSelect from '@mui/material/NativeSelect';

const easy = Math.floor(Math.random() * 15 + 10);
const medium = Math.floor(Math.random() * 15 + 20);
const hard = Math.floor(Math.random() * 15 + 30);

const DifficultyLevel = () => {
  const [difficultyLevel, setDifficultyLevel] = useState(easy);


  const handleChange = (e) => {
    if (e.target.value === 'easy') {
      setDifficultyLevel(easy);
    } else if (e.target.value === 'medium') {
      setDifficultyLevel(medium);
    } else if (e.target.value === 'hard') {
      setDifficultyLevel(hard);
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
