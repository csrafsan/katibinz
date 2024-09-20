let blockedSites = [];

// Load blocked sites from storage when the extension starts
chrome.storage.sync.get(['blockedSites'], (data) => {
  blockedSites = data.blockedSites || [];
  updateBlockRules(blockedSites);
});

// Listen for changes in the blocked sites and update rules dynamically
chrome.storage.onChanged.addListener((changes) => {
  if (changes.blockedSites) {
    blockedSites = changes.blockedSites.newValue;
    updateBlockRules(blockedSites);
  }
});

// Update block rules dynamically
function updateBlockRules(sites) {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: Array.from({ length: 1000 }, (_, i) => i + 1), // Remove old rules
    addRules: sites.map((url, id) => ({
      id: id + 1,
      action: { type: "block" },
      condition: { urlFilter: `*://${url}/*` }
    }))
  });
}
