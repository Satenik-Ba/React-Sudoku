import React from 'react';
import Box from '@mui/material/Box';
import NativeSelect from '@mui/material/NativeSelect';

const DifficultyLevel = ({ gameDifficultyLevel, wonGame }) => {
  const handleChange = (e) => {
    if (e.target.value === 'easy') {
      gameDifficultyLevel([50, 'Easy']);
    } else if (e.target.value === 'medium') {
      gameDifficultyLevel([60, 'Medium']);
    } else if (e.target.value === 'hard') {
      gameDifficultyLevel([70, 'Hard']);
    }
  };

  return (
    <Box sx={{ minWidth: 40 }}>
      <div>
        <label>Difficulty </label>
        <NativeSelect
          onChange={handleChange}
          disableUnderline
          disabled={wonGame}
        >
          <option value={'easy'}>Easy</option>
          <option value={'medium'}>Medium</option>
          <option value={'hard'}>Hard</option>
        </NativeSelect>
      </div>
    </Box>
  );
};
export default DifficultyLevel;
