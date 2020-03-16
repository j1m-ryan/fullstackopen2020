import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = () => {
  return <h1>give feedback</h1>;
};

//button refactor
const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticsHeader = () => <h1>statistics</h1>;
// display stats
const Statistic = ({ statName, statVal }) => {
  return (
    <>
      <span>
        {statName} {statVal}
      </span>
      <br />
    </>
  );
};
const Statistics = props => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;

  if (good === 0 && bad === 0 && neutral === 0) {
    return <>No feedback given</>;
  }
  return (
    <>
      <Statistic statName="good" statVal={good} />
      <Statistic statName="neutral" statVal={neutral} />
      <Statistic statName="bad" statVal={bad} />
      <Statistic statName="all" statVal={bad + good + neutral} />
      <Statistic
        statName="average"
        statVal={(good - bad) / (bad + good + neutral)}
      />
      <Statistic
        statName="postive"
        statVal={(good * 100) / (bad + good + neutral)}
      />
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
