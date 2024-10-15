// src/components/AdminView.js
import  { useState, useEffect } from 'react';
import socket from '../socket';
import { fetchCurrentScore, updateScore } from '../api/api';
import './styles/AdminView.css';

const AdminView = () => {
  const [score, setScore] = useState({ runs: 0, wickets: 0, over: 0 });
  const [currentBall, setCurrentBall] = useState(0);
  const [overs, setOvers] = useState([]);

  useEffect(() => {
    // Fetch current score and overs from API
    const loadInitialData = async () => {
      const res = await fetchCurrentScore();
      setScore(res.data.score);
      setOvers(res.data.overs);
      setCurrentBall(res.data.currentBall);
    };

    loadInitialData();

    // Listen for real-time updates via WebSocket
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

  const handleUpdateScore = (run) => {
    // Update the score immediately for a responsive UI
    const updatedRuns = score.runs + (run === -1 ? 0 : run);
    const updatedWickets = score.wickets + (run === -1 ? 1 : 0);
    
    // Check if we need to update the over logic here
    const newCurrentBall = currentBall + 1;

    // Update the state locally
    setScore({ runs: updatedRuns, wickets: updatedWickets, over: score.over });
    setCurrentBall(newCurrentBall);

    // Send the new score to backend
    updateScore(run, currentBall).then(() => {
      // After sending to backend, fetch the updated score and overs
      fetchCurrentScore().then((res) => {
        setScore(res.data.score);
        setOvers(res.data.overs);
        setCurrentBall(res.data.currentBall);
      });
    }).catch((err) => {
      console.error('Error updating score:', err);
    });
  };

  return (
    <div className="admin-view">
      <header>
        <h1>Cricket Score: {score.runs}/{score.wickets}</h1>
        <p>Over: {score.over}</p>
      </header>

      <section className="control-section">
        <h2>Current Ball: {currentBall}</h2>
        <div className="run-controls">
          {[0, 1, 2, 3, 4, 6].map((run) => (
            <button key={run} onClick={() => handleUpdateScore(run)}>
              {run} Runs
            </button>
          ))}
          <button onClick={() => handleUpdateScore(-1)}>Wicket</button>
        </div>
      </section>

      {/* Previous Overs Section */}
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

export default AdminView;
