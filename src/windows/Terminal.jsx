import { useState, useRef, useEffect } from "react";
import { techStack } from "#constants";
import windowWrapper from "#hoc/windowWrapper";
import { Check, Flag } from "lucide-react";
import WindowControls from "#components/windowControls";
import useWindowStore from "#store/window";

const Terminal = () => {
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [files, setFiles] = useState({
    "techStack.txt": true,
    "resume.pdf": true,
  }); // techStack.txt and resume.pdf already exist
  const [isFocused, setIsFocused] = useState(true);
  const inputRef = useRef(null);
    const terminalRef = useRef(null);
    const { openWindow, windows } = useWindowStore();
    const { zIndex } = windows["terminal"];

    // Auto-focus input when terminal's z-index changes (brought to front)
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [zIndex]);

  // Download resume.pdf
  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/files/resume.pdf";
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Map app names to window IDs
  const getWindowId = (appName) => {
    const normalizedName = appName.toLowerCase().trim();
    const appMap = {
      // Direct IDs
      finder: "finder",
      safari: "safari",
      photos: "photos",
      contact: "contact",
      terminal: "terminal",
      resume: "resume",
      // User-friendly aliases
      portfolio: "finder",
      articles: "safari",
      gallery: "photos",
      skills: "terminal",
    };
    return appMap[normalizedName];
  };

  // Execute command
  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return "";

    const [command, ...args] = trimmedCmd.split(" ");

    switch (command.toLowerCase()) {
      case "ls":
        return Object.keys(files)
          .filter((file) => files[file])
          .join("  ");

      case "touch": {
        if (args.length === 0) {
          return "touch: missing file operand";
        }
        const fileName = args[0];
        if (fileName === "techStack.txt") {
          setFiles((prev) => ({ ...prev, [fileName]: true }));
          return "";
        }
        setFiles((prev) => ({ ...prev, [fileName]: true }));
        return "";
      }

      case "cat": {
        if (args.length === 0) {
          return "cat: missing file operand";
        }
        const fileToRead = args[0];
        if (fileToRead === "techStack.txt" && files[fileToRead]) {
          const description = techStack.map(
            (item) => `${item.category}: ${item.items.join(", ")}`
          );
          openWindow("txtfile", {
            name: "techStack.txt",
            subtitle: "My Technical Stack",
            description: description,
          });
          return "Opening techStack.txt...";
        }
        if (fileToRead === "resume.pdf" && files[fileToRead]) {
          downloadResume();
          return "Downloading resume.pdf...";
        }
        if (!files[fileToRead]) {
          return `cat: ${fileToRead}: No such file or directory`;
        }
        return `cat: ${fileToRead}: File exists but is empty`;
      }

      case "help":
        return `Available commands:
  ls              - List files
  touch <file>    - Create a file
  cat <file>      - Display file contents (or download PDFs)
  open <app>      - Open an application (finder, safari, photos, contact)
  clear           - Clear terminal
  help            - Show this help message

Try: ls
Then: cat techStack.txt
Or: cat resume.pdf
Or: open safari`;

      case "open": {
        if (args.length === 0) {
          return "open: missing application name\nAvailable apps: finder, safari, photos, contact, terminal, resume";
        }
        const appName = args[0];
        const windowId = getWindowId(appName);
        if (!windowId) {
          return `open: cannot find application "${appName}"\nAvailable apps: finder, safari, photos, contact, terminal, resume`;
        }
        openWindow(windowId);
        return `Opening ${windowId}...`;
      }

      case "clear":
        setCommandHistory([]);
        return "";

      default:
        return `Command not found: ${command}. Type 'help' for available commands.`;
    }
  };

  // Handle command submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;

    const trimmedCmd = currentCommand.trim();
    const [command] = trimmedCmd.split(" ");

    // Handle clear command specially - don't add it to history
    if (command.toLowerCase() === "clear") {
      setCommandHistory([]);
      setCurrentCommand("");
      setHistoryIndex(-1);
      return;
    }

    const output = executeCommand(currentCommand);
    const newHistory = [...commandHistory, { command: currentCommand, output }];

    setCommandHistory(newHistory);
    setCurrentCommand("");
    setHistoryIndex(-1);

    // Auto-scroll to bottom
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 0);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex].command);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentCommand("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex].command);
        }
      }
    }
  };

  // Focus input when terminal is opened or clicked
  useEffect(() => {
    const currentTerminal = terminalRef.current;
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    focusInput();

    // Focus on click anywhere in terminal
    const handleClick = () => {
      focusInput();
    };

    if (currentTerminal) {
      currentTerminal.addEventListener("click", handleClick);
    }

    return () => {
      if (currentTerminal) {
        currentTerminal.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <>
      <div id="window-header">
        <WindowControls target="terminal" />
        <h2>Terminal</h2>
      </div>

      <div className="terminal-container" ref={terminalRef}>
        <div className="terminal-output">
          <div className="terminal-welcome">
            <p>
              <Check size={20} className="check" /> Welcome to Jeevant's
              Terminal
            </p>
            <p className="text-gray-400">
              <Flag size={15} fill="#9ca3af" /> Type 'help' to see available
              commands
            </p>
            <p className="text-gray-500 text-xs mt-2">
              💡 Try: <span className="text-green-400">ls</span> to see files,
              then <span className="text-green-400">cat techStack.txt</span> to
              view your tech stack
            </p>
          </div>

          {commandHistory.map((entry, index) => (
            <div key={index} className="terminal-entry">
              <div className="terminal-prompt">
                <span className="font-bold">@Jeevant'sPortfolioTerminal%</span>{" "}
                {entry.command}
              </div>
              {entry.output && (
                <div className="terminal-output-text">{entry.output}</div>
              )}
            </div>
          ))}

          <form
            onSubmit={handleSubmit}
            className="terminal-input-form"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="terminal-prompt whitespace-nowrap">
              <span className="font-bold">@Jeevant'sPortfolioTerminal%</span>{" "}
            </span>
            <div className="terminal-input-wrapper">
                <span className="terminal-input-display">
                    {currentCommand}
                    {isFocused && <span className="terminal-cursor">&nbsp;</span>}
                </span>
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                onClick={(e) => e.stopPropagation()}
                onFocus={(e) => {
                  e.stopPropagation();
                  setIsFocused(true);
                }}
                onBlur={() => setIsFocused(false)}
                className="terminal-input"
                autoFocus
                autoComplete="off"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = windowWrapper(Terminal, "terminal");

export default TerminalWindow;
