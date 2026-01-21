[README.md](https://github.com/user-attachments/files/24760172/README.md)
# VerusIT: Fresh Ink, Not Old Links

**VerusIT** is a high-performance Chrome Extension that identifies outdated content and technical debt in Google search results before you click. By injecting real-time "Relevance Badges," it helps developers and researchers avoid deprecated patterns and stale documentation.

## 🚀 Key Features

### 📅 Freshness Detection
Uses a "Traffic Light" system to categorize results based on publication date:
* **Fresh (Green)**: Content less than 6 months old.
* **Aging (Yellow)**: 6 months to 2 years old.
* **Stale (Red)**: Over 2 years old.

### 🛠️ Tech Debt & Modernity Scanning
Scans search snippets for over 40+ technical patterns to identify the underlying stack:
* **Danger**: High-risk or insecure patterns like `mysql_connect`, `eval()`, or deprecated React lifecycle methods.
* **Risk**: Outdated patterns like `var`, `componentWillMount`, or AngularJS.
* **Modern**: Highlights modern standards like React Hooks, ES Modules, and TypeScript.

### 🏛️ Source Intelligence
* **Official Docs**: Automatically flags high-authority domains like MDN, React.dev, and Python docs.
* **Platform Detection**: Identifies results from GitHub, Stack Overflow, NPM, and PyPI.

## 🔒 Privacy & Architecture

VerusIT is built with a **Privacy-First** philosophy:
* **Local Processing**: All date extraction and pattern matching run entirely in your browser.
* **Zero Data Transmission**: No browsing history, search queries, or analytics are ever sent to external servers.
* **No Persistence**: The extension does not use `chrome.storage` or cookies to track sessions.

## 🛠️ Installation (Developer Mode)

1.  Download or clone this repository.
2.  Navigate to `chrome://extensions/` in Google Chrome.
3.  Enable **"Developer mode"** in the top right.
4.  Click **"Load unpacked"** and select the `VerusIT` folder.

## 📁 Project Structure

```text
VerusIT/
├── manifest.json      # MV3 Configuration
├── content/
│   ├── hover.js       # Relevance Engine (DOM Analysis)
│   └── hover.css      # Badge Styling (IDE-inspired)
├── icons/             # Extension Icons
├── README.md          # Documentation
└── PRIVACY.md         # Privacy Policy
