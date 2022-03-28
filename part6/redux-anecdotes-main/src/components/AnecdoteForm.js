/* eslint-disable no-unused-vars */
import {connect} from 'react-redux';
import {addNewAnecdote} from '../reducers/anecdoteReducer';


const AnecdoteForm = (props) => {
  const addaQuote = (event) => {
    event.preventDefault();
    const target = event.target.quote.value;
    event.target.quote.value = '';
    props.addNewAnecdote(target);
  };

  return (
    <form onSubmit={addaQuote} >
      <h2>create new</h2>
      <div><input name='quote' /></div>
      <button type='submit'>create</button>
    </form>
  );
};

export default connect(
    null,
    {addNewAnecdote},
)(AnecdoteForm);
