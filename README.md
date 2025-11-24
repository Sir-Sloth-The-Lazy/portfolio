# Portfolio Website - macOS-Inspired Interface

A modern, interactive portfolio website inspired by macOS, featuring draggable windows, an animated dock, and a fully functional terminal. Built with React, Vite, and GSAP animations.

![Portfolio Preview](public/images/macbook.png)

## ✨ Features

### 🖥️ macOS-Inspired Interface
- **Draggable Windows**: All windows can be dragged around the screen using GSAP Draggable
- **Window Management**: Full window controls (close, minimize, maximize) with z-index management
- **Animated Dock**: Interactive dock with hover effects and smooth animations
- **Responsive Design**: Modern, clean UI with Tailwind CSS

### 💻 Interactive Terminal
A fully functional terminal emulator with the following commands:

- `ls` - List files in the current directory
- `touch <file>` - Create a new file
- `cat <file>` - Display file contents or download PDFs
  - `cat techStack.txt` - View tech stack information
  - `cat resume.pdf` - Download resume PDF
- `open <app>` - Open applications
  - Available apps: `finder`, `safari`, `photos`, `contact`
  - Aliases: `portfolio` (finder), `articles` (safari), `gallery` (photos), `skills` (terminal)
- `clear` - Clear terminal history
- `help` - Show available commands

**Example terminal usage:**
```bash
$ ls
techStack.txt  resume.pdf

$ cat techStack.txt
# Shows tech stack categories and items

$ cat resume.pdf
Downloading resume.pdf...

$ open safari
Opening safari...
```

### 📱 Applications

1. **Portfolio/Finder** - Browse projects and portfolio content
2. **Articles/Safari** - View blog posts and articles
3. **Gallery/Photos** - Image gallery with categorized photos
4. **Contact** - Contact information and social links
5. **Terminal/Skills** - Interactive terminal showcasing technical skills

## 🛠️ Tech Stack

### Core
- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework

### State Management
- **Zustand** - Lightweight state management
- **Immer** - Immutable state updates

### Animation
- **GSAP** - Professional animation library
- **@gsap/react** - React hooks for GSAP
- **GSAP Draggable** - Drag and drop functionality

### UI Components
- **Lucide React** - Icon library
- **React Tooltip** - Tooltip components
- **clsx** & **tailwind-merge** - Conditional class utilities

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── files/
│   │   └── resume.pdf          # Resume file
│   ├── icons/                   # SVG icons
│   ├── images/                  # Image assets
│   └── macbook.png             # Preview image
├── src/
│   ├── components/
│   │   ├── Dock.jsx            # Animated dock component
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   ├── Welcome.jsx         # Welcome screen
│   │   └── windowControls.jsx  # Window control buttons
│   ├── constants/
│   │   └── index.js            # App configuration and data
│   ├── hoc/
│   │   └── windowWrapper.jsx   # Higher-order component for windows
│   ├── store/
│   │   └── window.js           # Zustand store for window management
│   ├── windows/
│   │   ├── Terminal.jsx        # Terminal application
│   │   ├── safari.jsx          # Safari/Articles application
│   │   └── index.js            # Window exports
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles
├── package.json
├── vite.config.js              # Vite configuration with path aliases
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Adding New Windows

1. Create a new window component in `src/windows/`
2. Wrap it with `windowWrapper` HOC:
```jsx
import windowWrapper from "#hoc/windowWrapper";

const MyWindow = () => {
  // Your window content
};

export default windowWrapper(MyWindow, "myWindow");
```

3. Add window config in `src/constants/index.js`:
```js
const WINDOW_CONFIG = {
  // ... existing windows
  myWindow: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};
```

4. Add to dock apps in `src/constants/index.js`:
```js
const dockApps = [
  // ... existing apps
  {
    id: "myWindow",
    name: "My App",
    icon: "myicon.png",
    canOpen: true,
  },
];
```

### Adding Terminal Commands

Edit `src/windows/Terminal.jsx` and add a new case in the `executeCommand` function:

```jsx
case "mycommand":
  // Command logic here
  return "Command output";
```

### Styling

The project uses Tailwind CSS. Customize styles in:
- `src/index.css` - Global styles
- Component files - Inline Tailwind classes
- `tailwind.config.js` (if created) - Tailwind configuration

## 🔧 Path Aliases

The project uses path aliases for cleaner imports:

- `#components` → `src/components`
- `#constants` → `src/constants`
- `#store` → `src/store`
- `#hoc` → `src/hoc`
- `#windows` → `src/windows`

## 📝 Features in Detail

### Window Management
- Windows are managed through Zustand store
- Each window maintains its own state (open/closed, z-index, data)
- Windows can be dragged, focused, and controlled independently
- Window wrapper provides consistent behavior across all windows

### Terminal Features
- Command history with arrow key navigation
- File system simulation with virtual files
- PDF download functionality
- Application launcher via `open` command
- Real-time command execution

### Dock Animation
- Smooth hover effects on dock icons
- Icons scale and move based on mouse proximity
- Visual indicators for open applications
- Tooltips on hover

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**Jeevant Prakhar Singh**

- GitHub: [@Sir-Sloth-The-Lazy](https://github.com/Sir-Sloth-The-Lazy)
- LinkedIn: [jeevantpsingh](https://www.linkedin.com/in/jeevantpsingh)
- Twitter: [@JeevantSin61236](https://x.com/JeevantSin61236)

---

Built with ❤️ using React, Vite, and GSAP
