import React from 'react';
import Box from '@mui/material/Box';
import NativeSelect from '@mui/material/NativeSelect';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  difficultyDisplay: {
    fontSize: '1.5rem',
    '@media (max-width: 900px)': {
      fontSize: '1rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.7rem',
    },
   
  },
  select: {
    fontSize: '1.5rem',
    '@media (max-width: 900px)': {
      fontSize: '0.9rem !important',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.7rem !important',
    },
  },
});

const DifficultyLevel = ({ gameDifficultyLevel, gameWon }) => {
  const classes = useStyles();
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
      <div className={classes.difficultyDisplay}>
        <label>Difficulty </label>
        <NativeSelect
          className={classes.select}
          onChange={handleChange}
          disableUnderline
          disabled={gameWon}
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
