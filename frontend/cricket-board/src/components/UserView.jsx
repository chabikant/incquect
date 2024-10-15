// src/components/UserView.js
import { useState, useEffect } from 'react';
import socket from '../socket';
import { fetchCurrentScore } from '../api/api';
import './styles/UserView.css';

const UserView = () => {
  const [score, setScore] = useState({ runs: 0, wickets: 0, over: 0 });
  const [currentBall, setCurrentBall] = useState(0);
  const [overs, setOvers] = useState([]);
  const [lastBallRuns, setLastBallRuns] = useState(0);

  useEffect(() => {
    fetchCurrentScore().then((res) => {
      setScore(res.data.score);
      setOvers(res.data.overs);
      setCurrentBall(res.data.currentBall);
    });
  
    socket.on('scoreUpdate', (updatedScore) => {
      console.log('Received score update:', updatedScore); // Log for debugging
      setScore({
        runs: updatedScore.runs,
        wickets: updatedScore.wickets,
        over: updatedScore.over
      });
      setCurrentBall(updatedScore.currentBall);
      setOvers(updatedScore.overs); // Update the overs
    });
  
    return () => {
      socket.off('scoreUpdate');
    };
  }, []);
  

  return (
    <div className="user-view">
      <header>
        <h1>Live Cricket Score: {score.runs}/{score.wickets}</h1>
        <p>Over: {score.over}</p>
      </header>

      <div className="animation-section">
        {/* Show runs for the last ball instead of total runs */}
        <p>Run Animation for last ball: {lastBallRuns}</p>
      </div>

      <section className="over-listing">
        <h2>Previous Overs</h2>
        {overs.map((over, index) => (
          <div key={index}>
            <p>Over {index + 1}:</p>
            <p>
              {over.balls.map((ball, ballIndex) => (
                <span key={ballIndex}>
                  {ball.runs} {/* Display the 'runs' property of each ball */}
                  {ballIndex < over.balls.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default UserView;
