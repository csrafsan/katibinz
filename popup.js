document.getElementById('blockButton').addEventListener('click', () => {
    const url = document.getElementById('urlInput').value;
    
    if (url) {
      // Add the new blocked site to Chrome storage
      chrome.storage.sync.get(['blockedSites'], (data) => {
        const blockedSites = data.blockedSites || [];
        blockedSites.push(url);
  
        chrome.storage.sync.set({ blockedSites }, () => {
          alert(`${url} has been blocked`);
          document.getElementById('blockedSitesList').innerHTML += `<li>${url}</li>`;
        });
      });
    }
  });
  
  document.getElementById('openOptions').addEventListener('click', () => {
    console.log("Settings button clicked!");  // Log for debugging
    chrome.runtime.openOptionsPage();  // This is the standard way to open the options page
  });
  
  
  
  // Populate the blocked sites list on popup open
  chrome.storage.sync.get(['blockedSites'], (data) => {
    const blockedSites = data.blockedSites || [];
    const blockedSitesList = document.getElementById('blockedSitesList');
    blockedSites.forEach(site => {
      blockedSitesList.innerHTML += `<li>${site}</li>`;
    });
  });
  