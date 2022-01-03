import './App.css';
import Layout from './components/Layout';
import Box from '@mui/material/Box';
import Difficulty from './components/UI/Difficulty';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>Sudoku React App</h1> */}
        <Box>
          <Difficulty />
          <Layout />
        </Box>
      </header>
    </div>
  );
}

export default App;
