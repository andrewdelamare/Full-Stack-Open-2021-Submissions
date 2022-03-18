/* eslint-disable no-unused-vars */
import {useSelector, useDispatch} from 'react-redux';
import {add} from '../reducers/anecdoteReducer';

const AddQuote = () => {
  const dispatch = useDispatch();
  const addaQuote = (event) => {
    event.preventDefault();
    dispatch(add(event.target.quote.value));
    event.target.quote.value = '';
  };
  return (
    <form onSubmit={addaQuote} >
      <div><input name='quote' /></div>
      <button type='submit'>create</button>
    </form>
  );
};

export default AddQuote;
