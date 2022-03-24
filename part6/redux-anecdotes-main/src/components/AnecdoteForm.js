/* eslint-disable no-unused-vars */
import {useSelector, useDispatch} from 'react-redux';
import {addNewAnecdote} from '../reducers/anecdoteReducer';


const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addaQuote = (event) => {
    event.preventDefault();
    const target = event.target.quote.value;
    event.target.quote.value = '';
    dispatch(addNewAnecdote(target));
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
