import AnecdoteList from './components/AnecdotesList';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
