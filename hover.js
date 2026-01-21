console.log("VerusIT: Instant Engine v2.0");

const CONFIG = {
  titleSelector: 'h3',
  freshDays: 180,
  agingDays: 730
};

// --- UTILITIES ---
function getAgeClass(days) {
  if (days <= CONFIG.freshDays) return 'verus-fresh';
  if (days <= CONFIG.agingDays) return 'verus-aging';
  return 'verus-stale';
}

function formatAge(days) {
  if (days < 30) return `${days}d`;
  if (days < 365) return `${Math.floor(days / 30)}mo`;
  return `${Math.floor(days / 365)}y`;
}

function createBadge(text, type) {
  const badge = document.createElement('span');
  badge.className = `verus-badge ${type}`;
  badge.textContent = text;
  return badge;
}

// --- SCANNING ---
function processNode(title) {
  if (title.dataset.verusProcessed) return;
  title.dataset.verusProcessed = "true";

  const resultContainer = title.closest('div.g') || title.parentElement;
  if (!resultContainer) return;
  
  const textContent = resultContainer.textContent;

  // Date Logic
  const dateRegex = /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.? \d{1,2},? \d{4}|(\d+) (?:day|week|month|year)s? ago/i;
  const dateMatch = textContent.match(dateRegex);
  
  let daysOld = null;
  if (dateMatch) {
    if (dateMatch[0].includes('ago')) {
      const num = parseInt(dateMatch[1]);
      if (dateMatch[0].includes('year')) daysOld = num * 365;
      else if (dateMatch[0].includes('month')) daysOld = num * 30;
      else if (dateMatch[0].includes('week')) daysOld = num * 7;
      else daysOld = num;
    } else {
      const date = new Date(dateMatch[0]);
      if (!isNaN(date)) daysOld = Math.floor((Date.now() - date) / (1000 * 60 * 60 * 24));
    }
  }

  // Tech Logic
  const isLegacy = /var |mysql_connect|function \w+\(|componentWillMount/.test(textContent);
  const isModern = /const |useState|=>|useEffect/.test(textContent);
  
  // Build Badge
  const container = document.createElement('span');
  container.className = 'verus-container';
  let hasBadge = false;

  if (daysOld !== null) {
    container.appendChild(createBadge(formatAge(daysOld), getAgeClass(daysOld)));
    hasBadge = true;
  }

  if (isLegacy) {
    container.appendChild(createBadge('⚠️ Legacy', 'verus-risk'));
    hasBadge = true;
  } else if (isModern) {
    container.appendChild(createBadge('⚡ Modern', 'verus-modern'));
    hasBadge = true;
  }

  if (hasBadge) {
    title.appendChild(container);
  }
}

// --- INSTANT WATCHER (MutationObserver) ---
function startEngine() {
  // 1. Scan immediately
  document.querySelectorAll(CONFIG.titleSelector).forEach(processNode);

  // 2. Watch for changes (Infinite Scroll / New Searches)
  const observer = new MutationObserver((mutations) => {
    let shouldScan = false;
    for (const m of mutations) {
      if (m.addedNodes.length > 0) {
        shouldScan = true;
        break;
      }
    }
    if (shouldScan) {
      document.querySelectorAll(CONFIG.titleSelector).forEach(processNode);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Start immediately
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startEngine);
} else {
  startEngine();
}
