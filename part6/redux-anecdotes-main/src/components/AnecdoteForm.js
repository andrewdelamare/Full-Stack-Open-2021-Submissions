/* eslint-disable no-unused-vars */
import {useSelector, useDispatch} from 'react-redux';
import {add} from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addaQuote = (event) => {
    event.preventDefault();
    dispatch(add(event.target.quote.value));
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
