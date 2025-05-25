# 🧮 **Profesionalni Kalkulator**

> **Native desktop aplikacija sa Electron framework-om - pravi .exe kalkulator!**

![Electron](https://img.shields.io/badge/Electron-20+-47848F?style=for-the-badge&logo=electron&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Windows](https://img.shields.io/badge/Windows-EXE-0078D4?style=for-the-badge&logo=windows&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-AppImage-FCC624?style=for-the-badge&logo=linux&logoColor=black)

---

## ✨ **Karakteristike**

### 🖥️ **Native Desktop App**
- **Pravi .exe fajl** za Windows
- **AppImage** za Linux  
- **Standalone aplikacija** - ne treba browser
- **Sistem tray** podrška
- **Auto-updater** funkcionalnost

### 🎯 **Napredne Funkcije**
- **Memorijske operacije** - MS, MR, M+, M-, MC
- **Naučne funkcije** - sin, cos, tan, √, x²
- **Istorija kalkulacija** - čuva poslednje operacije
- **Keyboard shortcuts** - potpuna podrška
- **Responsive UI** - prilagođava se veličini prozora

### 🎨 **Moderni Dizajn**
- **Windows 11 stil** - elegantan i čist
- **Glassmorphism** efekti
- **Smooth animacije** i tranzicije
- **Dark theme** optimizovan
- **Customizable** veličina prozora

---

## 🚀 **Instalacija i Pokretanje**

### **Preduslovi**
```bash
# Instaliraj Node.js (16+)
node --version
npm --version
```

### **Setup**
```bash
# Instaliraj dependencies
npm install

# Development mode
npm run dev

# Build za produkciju
npm run build

# Build samo Windows .exe
npm run build:win

# Build samo Linux AppImage  
npm run build:linux
```

---

## 📦 **Build Outputs**

### **Windows**
```
📁 dist/
├── 📄 Profesionalni Kalkulator Setup 1.0.0.exe  # Installer
├── 📄 Profesionalni Kalkulator 1.0.0.exe        # Portable
└── 📁 win-unpacked/                              # Unpacked files
```

### **Linux**
```
📁 dist/
├── 📄 Profesionalni Kalkulator-1.0.0.AppImage   # Portable
└── 📁 linux-unpacked/                           # Unpacked files
```

---

## 🛠️ **Struktura Projekta**

```
📁 profesionalni-kalkulator/
├── 📁 frontend/
│   ├── 📄 index.html       # UI layout
│   ├── 📄 style.css        # Stilovi
│   └── 📄 script.js        # Frontend logika
├── 📁 dist/                # Build outputs
├── 📄 main.js              # Electron main process
├── 📄 package.json         # NPM konfiguracija
├── 📄 package-lock.json    # Dependency lock
└── 📄 README.md            # Dokumentacija
```

---

## ⚙️ **Konfiguracija**

### **package.json Scripts**
```json
{
  "scripts": {
    "dev": "electron .",
    "build": "electron-builder",
    "build:win": "electron-builder --win",
    "build:linux": "electron-builder --linux",
    "dist": "npm run build"
  }
}
```

### **Electron Builder Config**
```json
{
  "build": {
    "appId": "com.profesionalni.kalkulator",
    "productName": "Profesionalni Kalkulator",
    "directories": {
      "output": "dist"
    },
    "files": ["**/*", "!README.md"],
    "win": {
      "target": "nsis",
      "icon": "assets/icon.ico"
    },
    "linux": {
      "target": "AppImage",
      "icon": "assets/icon.png"
    }
  }
}
```

---

## 🎯 **Funkcionalnosti**

### **Osnovne Operacije**
```
✅ +, -, ×, ÷ operatori
✅ Decimalni brojevi
✅ Negativni brojevi (±)
✅ Backspace i Clear
✅ Keyboard input
```

### **Memorijske Funkcije**
```
✅ MS - Memory Store
✅ MR - Memory Recall  
✅ M+ - Memory Add
✅ M- - Memory Subtract
✅ MC - Memory Clear
✅ Memory indicator
```

### **Naučne Funkcije**
```
✅ sin, cos, tan (stepeni)
✅ √ - Kvadratni koren
✅ x² - Kvadrat broja
✅ Error handling
```

### **Desktop Features**
```
✅ Window resizing
✅ Minimize to tray
✅ Always on top opcija
✅ Auto-start sa sistemom
✅ Portable .exe verzija
```

---

## ⌨️ **Keyboard Shortcuts**

| **Kombinacija** | **Akcija** |
|-----------------|------------|
| `Ctrl + Q` | Izađi iz aplikacije |
| `Ctrl + M` | Minimize u tray |
| `Ctrl + T` | Always on top |
| `Ctrl + H` | Prikaži/sakrij istoriju |
| `F11` | Fullscreen mode |
| `Esc` | Clear All |

---

## 🔧 **Development**

### **Hot Reload**
```bash
# Pokreni u development mode
npm run dev

# Automatski restart na promene
nodemon --exec "npm run dev"
```

### **Debugging**
```bash
# Otvori DevTools
Ctrl + Shift + I (u aplikaciji)

# Console logs
console.log() u script.js
```

---

## 📋 **Sistemski Zahtevi**

### **Windows**
- Windows 7+ (64-bit)
- 50MB slobodnog prostora
- .NET Framework 4.5+

### **Linux**
- Ubuntu 16.04+ / CentOS 7+
- 50MB slobodnog prostora
- GLIBC 2.17+

---

## 🎨 **Customization**

### **Promeni Temu**
```css
/* U frontend/style.css */
:root {
  --primary-color: #your-color;
  --background: #your-bg;
}
```

### **Dodaj Ikonu**
```
📁 assets/
├── 📄 icon.ico     # Windows ikona
└── 📄 icon.png     # Linux ikona
```

---

## 📝 **Licenca**

**MIT License** - Slobodno koristite i distribuirajte

---

## 🚀 **Quick Start**

```bash
git clone <repo>
cd profesionalni-kalkulator
npm install
npm run build:win
./dist/Profesionalni\ Kalkulator\ 1.0.0.exe
```
