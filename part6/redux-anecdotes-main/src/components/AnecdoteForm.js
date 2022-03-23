/* eslint-disable no-unused-vars */
import {useSelector, useDispatch} from 'react-redux';
import {add} from '../reducers/anecdoteReducer';
import {notify, clear} from '../reducers/notificationReducer';
import {addAnecdote} from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addaQuote = (event) => {
    const target = event.target.quote.value;
    event.preventDefault();
    addAnecdote(target);
    dispatch(add(target));
    dispatch(notify(`Added: ${target}`));
    setTimeout(()=> {
      dispatch(clear());
    }, 5000);
    event.target.quote.value = '';
  };
  return (
    <form onSubmit={addaQuote} >
      <h2>create new</h2>
      <div><input name='quote' /></div>
      <button type='submit'>create</button>
    </form>
  );
};

export default AnecdoteForm;
