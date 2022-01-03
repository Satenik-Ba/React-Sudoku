import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const Difficulty = () => {

  return (
    <Box sx={{ minWidth: 50 }}>
      <div >
        <label>Difficulty </label> 
        <NativeSelect
          defaultValue={'easy'}>
          <option value={'easy'}>Easy</option>
          <option value={'medium'}>Medium</option>
          <option value={'hard'}>Hard</option>
        </NativeSelect>
      </div>
   
    </Box>
  );
}
export default Difficulty; 