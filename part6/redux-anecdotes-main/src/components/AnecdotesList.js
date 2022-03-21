/* eslint-disable no-unused-vars */
import {useSelector, useDispatch} from 'react-redux';
import {vote} from '../reducers/anecdoteReducer';

const Anecdote = ({anecdote, handleVote}) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
            has {anecdote.votes}
        <button onClick={() => (handleVote(anecdote.id))}>vote</button>
      </div>
    </div>
  );
};


const AnecodteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();
  const voted = (id) => dispatch(vote(id));

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
