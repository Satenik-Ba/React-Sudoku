import './App.css';
import Layout from './components/Layout';
import Box from '@mui/material/Box';
import Difficulty from './components/UI/Difficulty';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Box>
          <Difficulty />
          <Layout />
        </Box>
      </header>
    </div>
  );
}

export default App;
