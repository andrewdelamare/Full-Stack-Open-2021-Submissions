/* eslint-disable no-unused-vars */
import {useSelector, useDispatch} from 'react-redux';
import {add} from '../reducers/anecdoteReducer';
import {notify} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addaQuote = (event) => {
    event.preventDefault();
    dispatch(add(event.target.quote.value));
    dispatch(notify('Added an anecdote'));
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
