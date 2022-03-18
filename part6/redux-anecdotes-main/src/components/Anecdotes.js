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


const Anecodtes = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const voted = (id) => dispatch(vote(id));
  const sorted = anecdotes.sort((a, b) => b.votes - a.votes);
  const listed = sorted.map((anec) => {
    return (
      <Anecdote key={anec.id} anecdote={anec} handleVote={voted} />);
  });
  return (
    <div>
      {listed}
    </div>
  );
};

export default Anecodtes;
