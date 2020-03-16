import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
);
const Votes = props => <span>has {props.votes} votes</span>;

const App = props => {
  const [selected, setSelected] = useState(0);
  const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
  const [numVotes, setVotes] = useState(new Uint8Array(props.anecdotes.length));
  const [bestQuote, setBest] = useState(0);
  const incrementVotes = () => {
    numVotes[selected] += 1;
    setVotes([...numVotes]);
    findBest();
  };
  const findBest = () => {
    let max = Math.max(...numVotes);
    setBest(numVotes.indexOf(max));
  };
  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>

      <Votes votes={numVotes[selected]} />
      <br />
      <Button text="vote" handleClick={incrementVotes} />
      <Button
        text="next anecdote"
        handleClick={() => {
          let randInt = getRandomInt(props.anecdotes.length);
          while (randInt === selected) {
            randInt = getRandomInt(props.anecdotes.length);
          }
          setSelected(randInt);
          findBest();
        }}
      />
      <h1>Anecdote with the most votes</h1>
      <div>{props.anecdotes[bestQuote]}</div>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
