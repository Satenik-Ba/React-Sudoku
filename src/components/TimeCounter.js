import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseIcon from '@mui/icons-material/Pause';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'center',
  },
  icons: {
    border: 'none',
    color: '#354f52',
    padding: '0 0.5rem',
  },
});

const TimeCounter = ({ wonGame, timeCompleted, solved }) => {
  console.log('TIME COUNTER');
  const classes = useStyles();
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(true);

  useEffect(() => {
    if(wonGame) {
      setTimerOn(false);
      timeCompleted(time);
    } else {
      setTime(0);
      setTimerOn(true);
    }
    if (solved && !wonGame) {
      setTime(0);
      setTimerOn(false);
    }
  }, [wonGame, timeCompleted, solved]);

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  return (
    <div className={classes.root}>
      <div>
        <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}</span>
      </div>
      <div>
        {!timerOn && time === 0 && (
          <PlayCircleFilledRoundedIcon
            className={classes.icons}
            onClick={() => setTimerOn(true)}
          />
        )}
        {timerOn && (
          <PauseIcon
            className={classes.icons}
            onClick={() => setTimerOn(false)}
          />
        )}
        {!timerOn && time > 0 && (
          <PlayCircleFilledRoundedIcon
            className={classes.icons}
            onClick={() => setTimerOn(true)}
          />
        )}
      </div>
    </div>
  );
};

export default TimeCounter;
