/* eslint-disable no-unused-vars */
import {useEffect} from 'react';
import AnecdoteList from './components/AnecdotesList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Filter from './components/Filter';
import getAll from './services/anecdotes';
import {initialize} from './reducers/anecdoteReducer';
import {useDispatch} from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getAll().then((quotes) => dispatch(initialize(quotes)));
  }, [dispatch]);
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
