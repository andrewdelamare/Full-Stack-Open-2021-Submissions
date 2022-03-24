/* eslint-disable no-unused-vars */
import {useEffect} from 'react';
import AnecdoteList from './components/AnecdotesList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Filter from './components/Filter';
import {initializeAnecdotes} from './reducers/anecdoteReducer';
import {useDispatch} from 'react-redux';


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
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
