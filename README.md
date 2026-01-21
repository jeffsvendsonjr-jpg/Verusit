# VerusIT: Fresh Ink, Not Old Links

**VerusIT** is a privacy-first Chrome Extension that instantly identifies the age and technical relevance of Google search results. By injecting "Freshness Badges" directly into the interface, it helps developers and researchers avoid outdated tutorials, deprecated documentation, and stale news before they click.

![VerusIT Badge Example](icons/128.png)

## 🚀 Key Features

### 📅 Freshness Detection (Traffic Light System)
VerusIT analyzes search snippets and metadata to visualize content age:
- **🟢 Fresh**: Content < 6 months old.
- **🟡 Aging**: 6 months to 2 years old.
- **🔴 Stale**: Content > 2 years old.

### 🛠️ Tech Stack & Debt Scanning
Automatically flags technical patterns in search results to warn you of legacy code or highlight modern best practices:
- **⚡ Modern**: Detects modern patterns (e.g., `useState`, `const`, `arrow functions`, `TypeScript`).
- **⚠️ Legacy/Risk**: Warns about deprecated or insecure patterns (e.g., `mysql_connect`, `var`, `componentWillMount`).

### 🔒 Privacy by Design
- **Local Processing**: All analysis happens 100% on your device.
- **Zero Data Collection**: We do not collect, store, or transmit your search queries or browsing history.
- **No Analytics**: No third-party tracking scripts.

## ⚙️ Installation (Developer Mode)

1.  **Download** or clone this repository to your local machine.
2.  Open Chrome and navigate to `chrome://extensions/`.
3.  Toggle **"Developer mode"** in the top right corner.
4.  Click **"Load unpacked"**.
5.  Select the `VerusIT` folder.

## 📝 Permissions Explained

To function, VerusIT requires the following permission in `manifest.json`:

* `"host_permissions": ["*://www.google.com/*"]`

**Why?** This permission is strictly necessary to:
1.  Read the DOM of Google Search results pages.
2.  Inject the visual "badges" next to the result titles.

**Note:** This extension **only** runs on Google Search pages. It does not access or read data from any other websites you visit.

## 📁 Project Structure

```text
VerusIT/
├── manifest.json      # MV3 Configuration & Permissions
├── content/
│   ├── hover.js       # Core Logic: Date extraction & Badge injection
│   └── hover.css      # Badge styling
├── icons/             # Extension assets
├── README.md          # Documentation
└── PRIVACY.md         # Privacy Policy & Contact
