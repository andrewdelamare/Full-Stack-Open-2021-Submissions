/* eslint-disable no-param-reassign */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate,
} from 'react-router-dom';
import { useField } from './hooks/index';

function Menu({ ane, cre, abo }) {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <a href={ane} style={padding}>anecdotes</a>
      <a href={cre} style={padding}>create new</a>
      <a href={abo} style={padding}>about</a>
    </div>
  );
}

function AnecdoteList({ anecdotes }) {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => <li key={anecdote.id}><Link to={`anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
      </ul>
    </div>
  );
}

function SingleAnecdote({ anecdotes }) {
  const { id } = useParams();
  const anecdote = anecdotes.find((a) => a.id.toString() === id);
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>
        has
        {' '}
        {anecdote.votes}
        {' '}
        votes
      </p>
      <p>
        for more info see
        {' '}
        <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>

      <em>
        An anecdote is a brief, revealing account of an individual person or an incident.
        Occasionally humorous, anecdotes differ from jokes because their primary purpose
        is not simply to provoke laughter but to reveal a truth more general than the brief tale
        itself, such as to characterize a person by delineating a specific quirk or trait,
        to communicate an abstract idea about a person, place,
        or thing through the concrete details of a short narrative.
        An anecdote is "a story with a point."
      </em>

      <p>
        Software engineering is full of excellent anecdotes,
        at this app you can find the best and add more.
      </p>
    </div>
  );
}

function Footer() {
  return (
    <div>
      Anecdote app for
      {' '}
      <a href="https://fullstackopen.com/">Full Stack Open</a>
      .

      See
      <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a>
      {' '}
      for the source code.
    </div>
  );
}

function CreateNew({ addNew }) {
  const content = useField('content');
  const author = useField('author');
  const info = useField('info');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name={content.type} value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input name={author.type} value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input name={info.type} value={info.value} onChange={info.onChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}

function Notification({ message }) {
  const successStyles = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '18px',
    borderStyle: 'solid',
    borderRadius: '7px',
    padding: '8px',
    marginBottom: '8px',
  };
  if (message === null) {
    return null;
  } if (message !== null) {
    return (
      <div className="success" id="success" style={successStyles}>
        {message}
      </div>
    );
  }
}

function App() {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState(null);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`Successfully added: ${anecdote.content}`);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <Router>
      <h1>Software anecdotes</h1>
      <Menu ane="/" cre="/create" abo="/about" />
      <Notification message={notification} />
      <Routes>
        <Route path="/anecdotes/:id" element={<SingleAnecdote anecdotes={anecdotes} />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
