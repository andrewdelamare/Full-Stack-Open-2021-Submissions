/* eslint-disable no-unused-vars */
import {useSelector, useDispatch} from 'react-redux';
import {vote} from '../reducers/anecdoteReducer';
import {notify, clear} from '../reducers/notificationReducer';

const Anecdote = ({anecdote, handleVote}) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
            has {anecdote.votes}
        <button onClick={() => (handleVote(anecdote))}>vote</button>
      </div>
    </div>
  );
};


const AnecodteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === '') {
      return state.anecdotes;
    } else {
      const filtered = state.anecdotes.filter((anec) => anec.content.includes(state.filter));
      console.log(filtered);
      return filtered;
    }
  });
  const dispatch = useDispatch();
  const voted = (anecdote) => {
    dispatch(vote(anecdote.id));
    dispatch(notify(`Voted for: ${anecdote.content}`));
    setTimeout(()=> {
      dispatch(clear());
    }, 5000);
  };

  const listed = anecdotes.map((anec) => {
    return (
      <Anecdote key={anec.id} anecdote={anec} handleVote={voted} />);
  });
  return (
    <div>
      {listed}
    </div>
  );
};

export default AnecodteList;
