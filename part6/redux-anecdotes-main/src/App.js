import Anecdotes from './components/Anecdotes';
import AddQuote from './components/AddQuote';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <h2>create new</h2>
      <AddQuote />
    </div>
  );
};

export default App;
