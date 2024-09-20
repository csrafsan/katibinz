// Load user stats
chrome.storage.sync.get(['blockAttempts'], (data) => {
    const analyticsDiv = document.getElementById('analytics');
    const blockAttempts = data.blockAttempts || 0;
    analyticsDiv.textContent = `Number of Blocked Attempts: ${blockAttempts}`;
  });
  
  // Save schedule
  document.getElementById('saveSchedule').addEventListener('click', () => {
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    
    const schedule = { start: startTime, end: endTime };
    chrome.storage.sync.set({ schedule });
    alert('Schedule Saved');
  });
  
  // Change active profile
  document.getElementById('profileSelect').addEventListener('change', (event) => {
    const profile = event.target.value;
    chrome.storage.sync.set({ activeProfile: profile });
  });
  