import './App.css';
import Layout from './components/Layout'
import Box from '@mui/material/Box';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>Sudoku React App</h1> */}
        <Box>
          <Layout />
        </Box>
      </header>
    </div>
  );
}

export default App;
