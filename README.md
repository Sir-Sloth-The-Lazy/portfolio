<div align="center">
  <img width="100%" alt="macOS Portfolio Banner" src="https://github.com/user-attachments/assets/f0d14674-84e6-45ca-90db-01132af62ec9" />

  <h1> macOS Portfolio</h1>

  <p>
    <strong>A stunning, interactive portfolio website inspired by macOS.</strong><br>
    Featuring draggable windows, a dynamic dock, and a fully functional terminal.
  </p>

  <p>
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-project-structure">Structure</a>
  </p>

  <div align="center">
    <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
    <img src="https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white" alt="Zustand" />
  </div>
</div>

<br />

## ✨ Features

Experience a web-based Mac operating system built for the modern web. 

### 🖥️ Desktop Environment

- **Draggable Windows**: Smooth, physics-based window dragging using GSAP.
- **Window Management**: Minimize, maximize, and close windows with proper z-index layering.
- **Interactive Dock**: A fully animated dock with magnification effects.
- **Responsive Design**: Adapts beautifully to different screen sizes.

### 💻 Terminal Emulator

A powerful command-line interface for power users.

- **File System**: Navigate a virtual file system with `ls`, `cd`, and `cat`.
- **Commands**:
  - `open <app>`: Launch applications (e.g., `open safari`).
  - `cat resume.pdf`: Instantly download the resume.
  - `help`: Discover all available commands.
- **History**: Cycle through command history with Up/Down arrows.

### 📱 Applications

| App          | Description                        | Status         |
| :----------- | :--------------------------------- | :------------- |
| **Terminal** | Interactive command line interface | ✅ Ready       |
| **Safari**   | Read articles and browse content   | ✅ Ready       |
| **Finder**   | Browse projects and files          | 🚧 In Progress |
| **Photos**   | Image gallery                      | 🚧 In Progress |
| **Contact**  | Get in touch                       | 🚧 In Progress |

---

## 🛠️ Tech Stack

Built with cutting-edge frontend technologies for maximum performance and interactivity.

| Category      | Technologies                                                                                                                                                                               |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core**      | ![React](https://img.shields.io/badge/-React_19-black?style=flat-square&logo=react) ![Vite](https://img.shields.io/badge/-Vite-black?style=flat-square&logo=vite)                          |
| **Styling**   | ![Tailwind](https://img.shields.io/badge/-Tailwind_CSS-black?style=flat-square&logo=tailwindcss) ![Lucide](https://img.shields.io/badge/-Lucide_Icons-black?style=flat-square&logo=lucide) |
| **State**     | ![Zustand](https://img.shields.io/badge/-Zustand-black?style=flat-square) ![Immer](https://img.shields.io/badge/-Immer-black?style=flat-square)                                            |
| **Animation** | ![GSAP](https://img.shields.io/badge/-GSAP-black?style=flat-square&logo=greensock) ![Framer Motion](https://img.shields.io/badge/-Draggable-black?style=flat-square)                       |

---

## 📁 Project Structure

```bash
portfolio/
├── public/             # Static assets (icons, images, resume)
├── src/
│   ├── components/     # UI Components (Dock, Navbar, etc.)
│   ├── constants/      # App configuration & data
│   ├── hoc/            # Higher-Order Components (WindowWrapper)
│   ├── store/          # Zustand state management
│   ├── windows/        # Application windows (Terminal, Safari)
│   ├── App.jsx         # Main layout
│   └── main.jsx        # Entry point
└── README.md
```

---

## 🚀 Getting Started

Follow these steps to get the OS running on your local machine.

### Prerequisites

- **Node.js** (v18+)
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Visit `http://localhost:5173` to see the magic! ✨

---

## 🎨 Customization

### Adding a New App

1. Create your component in `src/windows/`.
2. Wrap it with `windowWrapper` HOC.
3. Register it in `src/constants/index.js` (add to `WINDOW_CONFIG` and `dockApps`).
4. Import and render it in `App.jsx`.

---

## 👨‍💻 Author

<div align="center">

**Jeevant Prakhar Singh**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Sir-Sloth-The-Lazy)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jeevantpsingh)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/JeevantSin61236)

</div>

---

<div align="center">
  <sub>Built with ❤️ using React, Vite, and GSAP</sub>
</div>
