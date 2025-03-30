# 🐣 Origin Organizer

A Vue 3 + Vuetify app to manage the lineage, history, and traits of farm fowl (chickens, ducks, geese, etc.).
Capacitor is used to wrap the app as a native Android app with support for hot reload and production builds.

---

## 🛠️ Tech Stack

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vuetify 3](https://vuetifyjs.com/)
- [Pinia](https://pinia.vuejs.org/)
- [Firebase](https://firebase.google.com/)
- [Capacitor](https://capacitorjs.com/) for Android native wrapper

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourname/origin-organizer.git
cd origin-organizer
```

### 2. Install dependencies
```bash
  npm install
```

---

## 👨‍💻 Web Development (Local)

### Start Vite dev server:
```bash
  npm run dev
```

Then open:
`http://localhost:8080`

---

## 📱 Android Development (Capacitor)

### First-Time Setup
```bash
  npx cap add android
```

> This creates the `/android` native wrapper.

> IMPORTANT: If on windows, ensure private/personal network settings and/or confirm port rules for 8080

---

## 🔁 Live Reload on Android Emulator

### Run dev server and inject live config:
```bash
  npm run dev:mobile
```

This will:
- Switch `capacitor.config.json` to use `http://10.0.2.2:8080`
- Start the Vite dev server on port `8080`

> `10.0.2.2` allows the Android emulator to reach your PC’s localhost.

### Then:
```bash
  npx cap copy android
  npx cap open android
```

Hit **Run** inside Android Studio to launch on emulator or device.

---

## 📦 Build for Production (Native Android App)

### Step 1: Build the Vue app & switch to prod config
```bash
  npm run build:mobile
```

This will:
- Copy `capacitor.config.prod.json` to `capacitor.config.json`
- Run `vite build`
- Copy `/dist` files to the native wrapper

### Step 2: Open Android Studio and generate a signed bundle
```bash
  npx cap open android
```

Then:
- Build > Generate Signed Bundle / APK > `.aab`
- Upload to Google Play Console

---

## 🧰 Toggle Capacitor Configs

We use two files:
- `capacitor.config.dev.json` → for live reload
- `capacitor.config.prod.json` → for production builds

The toggle is handled by this script:
```
scripts/switch-capacitor-config.mjs
```

It’s run via:
```bash
  npm run dev:mobile
  npm run build:mobile
```

---

## 📁 Project Structure

```
origin-organizer/
├── android/                      # Native Android wrapper
├── scripts/
│   └── switch-capacitor-config.mjs
├── src/                         # Vue app source
├── capacitor.config.json        # Active config (swapped per script)
├── capacitor.config.dev.json    # Dev config
├── capacitor.config.prod.json   # Production config
├── vite.config.js
├── package.json
└── README.md
```

---

## 🔐 Keystore Note

For release builds, you must generate and securely store your own `keystore.jks` file.
This is required to sign your `.aab` before uploading to the Play Store.

---

## 🧪 Troubleshooting

- If emulator shows a white screen:
    - Make sure Vite dev server is running on `0.0.0.0:8080`
    - Confirm `http://10.0.2.2:8080` works inside Chrome on the emulator

- If config toggle isn’t working:
    - Ensure you're running with Node >= 18
    - Make sure you renamed the script to `.mjs` and are using `"type": "module"` in `package.json`

---

## 📣 Contributions & Contact

Made for personal use and open to contribution. PRs welcome.  
Contact: [yourname@example.com](mailto:yourname@example.com)

---
## Bonus Things...
### [TIAGA Integration](https://docs.taiga.io/changing-elements-status-via-commit-message.html)
Add `TG-REF #STATUS-slug` to commit summary or description to change TIAGA ticket status
- Example:  
- `TG-123 #in-progress`
- `TG-123 #in-pr`
- `TG-123 #done`
- Example: `TG-12 updated readme to relfect changes...`

### To Integrate github desktop or git with TIAGA 
this will...
AUTO pre-pend pre commit messages with TG-XX

- navigate to /.git/hooks
- create file named `prepare-commit-msg`
- add the following to the file

```
#!/bin/sh
branch=$(git symbolic-ref --short HEAD)
echo "$branch: $(cat "$1")" > "$1"
```

- restart github desktop