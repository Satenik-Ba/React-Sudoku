import './App.css';
import Layout from './components/Layout';
import Box from '@mui/material/Box';
import Difficulty from './components/UI/Difficulty';
import Button from './components/UI/Button';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Box>
          <Difficulty />
          <Button>New Game</Button>
          <Layout />
        </Box>
      </header>
    </div>
  );
}

export default App;
