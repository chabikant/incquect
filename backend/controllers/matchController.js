// controllers/matchController.js
const Match = require('../models/matchModel');


// Fetch the current score and overs
const getCurrentMatch = async (req, res) => {
  try {
    let match = await Match.findOne({});
    if (!match) {
      match = new Match();
      await match.save();
    }
    res.json({
      score: { runs: match.runs, wickets: match.wickets, over: match.currentOver },
      overs: match.overs,
      currentBall: match.currentBall,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the score for the current ball
const updateScore = async (req, res) => {
    const { run } = req.body; // Current ball is now handled in the logic
    try {
      let match = await Match.findOne({});
      if (!match) {
        match = new Match(); // Create a new match if none exists
      }
  
      // Update runs and wickets
      match.runs += run === -1 ? 0 : run;  // Update runs (0 for wicket)
      match.wickets += run === -1 ? 1 : 0; // Increment wicket count if run is -1
  
      // Increment ball count
      match.currentBall += 1;
  
      // Check if the current ball has reached 6 (end of over)
      if (match.currentBall > 6) {
        match.currentOver += 1;  // Increment the over
        match.currentBall = 1;    // Reset currentBall to 1 (start of new over)
        match.overs.push({ overNumber: match.currentOver, balls: [] }); // Create a new over
      }
  
      // Push the current ball into the last over's balls
      const lastOverIndex = match.currentOver - 1; // Since array index is 0-based
      if (match.overs[lastOverIndex]) {
        match.overs[lastOverIndex].balls.push({ runs: run, ballNumber: match.currentBall });
      }
  
      await match.save();
  
      // Emit real-time updates via WebSocket
      io.emit('scoreUpdate', {
        runs: match.runs,
        wickets: match.wickets,
        over: match.currentOver,
        currentBall: match.currentBall,
        overs: match.overs
      });
  
      // Send back the updated match object
      res.json(match);
    } catch (error) {
      if (!res.headersSent) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
      }
    }
  };
  
  
  
  
module.exports = { getCurrentMatch, updateScore };
