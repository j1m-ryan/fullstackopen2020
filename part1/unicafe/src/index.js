import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = () => {
  return <h1>give feedback</h1>;
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticsHeader = () => <h1>statistics</h1>;

const Statistics = ({ statName, statVal }) => {
  return (
    <>
      <span>
        {statName} {statVal}
      </span>
      <br />
    </>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <Header />
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <StatisticsHeader />
      <Statistics statName="good" statVal={good} />
      <Statistics statName="neutral" statVal={neutral} />
      <Statistics statName="bad" statVal={bad} />
      <Statistics statName="all" statVal={bad + good + neutral} />
      <Statistics
        statName="average"
        statVal={(good - bad) / (bad + good + neutral)}
      />
      <Statistics
        statName="postive"
        statVal={(good * 100) / (bad + good + neutral)}
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
