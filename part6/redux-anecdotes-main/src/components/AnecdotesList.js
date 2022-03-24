/* eslint-disable no-unused-vars */
import {useSelector, useDispatch} from 'react-redux';
import {voteIt} from '../reducers/anecdoteReducer';
import {displayNotification} from '../reducers/notificationReducer';

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
      const filter = state.filter;
      const filtered = [];
      state.anecdotes.forEach((anec) => {
        anec.content.includes(filter) ? filtered.push(anec) : null;
      });
      return filtered;
    }
  });
  const dispatch = useDispatch();
  const voted = (anecdote) => {
    dispatch(voteIt(anecdote, anecdote.votes));
    dispatch(displayNotification(`Voted for: ${anecdote.content}`, 5));
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
