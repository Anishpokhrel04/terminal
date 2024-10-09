import "../index.css";
import commands, { socialsCommands } from "./commands";
import { useState, useRef, useEffect } from "react";
import Typewriter from "react-typewriter-effect";

function Terminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    "Hi! I'm Anish's personal assistant! How can I help you? Type 'help' for a list of commands.",
  ]); // Initial greeting message
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef();
  const [commandContext, setCommandContext] = useState(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0); // Track the current line index

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Effect to type out lines one by one
  useEffect(() => {
    if (currentLineIndex < output.length) {
      setIsTyping(true);
      const timeout = setTimeout(() => {
        setIsTyping(false);
        setCurrentLineIndex((prev) => prev + 1); // Move to the next line
      }, 2000); // Adjust delay as needed

      return () => clearTimeout(timeout);
    }
  }, [output, currentLineIndex]);

  const handleCommandInput = (userInput) => {
    const newOutput = [...output, `user: ${userInput}`]; // Add user input to output array

    if (userInput === "help") {
      // Display available commands as a list
      newOutput.push("Available commands:");
      newOutput.push(" - 'website' - view my portfolio");
      newOutput.push(" - 'hi' - say hello to me");
      newOutput.push(" - 'clear' - clear the terminal");
      newOutput.push(" - 'socials' - view a list of my social media accounts");
      newOutput.push(" - 'about' - learn more about me");
      newOutput.push(" - 'contact' - send me an email");
    } else if (userInput === "clear") {
      // Clear the terminal output
      setOutput([
        "Hi! I'm Anish's personal assistant! How can I help you? Type 'help' for a list of commands.",
      ]); // Reset to initial message
      setCurrentLineIndex(0); // Reset the line index for typing effect
      return; // Exit the function to prevent further processing
    } else if (commands.hasOwnProperty(userInput)) {
      const commandResult = commands[userInput]();
      newOutput.push(processCommand(commandResult));

      // Handle the "socials" command with context
      if (userInput === "socials") {
        setCommandContext("socials");
        newOutput.push(
          "Enter a social platform command or 'exit' to leave socials context."
        );
      } else {
        setCommandContext(null); // Reset context if not "socials"
      }
    } else if (
      commandContext === "socials" &&
      socialsCommands.hasOwnProperty(userInput)
    ) {
      const commandResult = socialsCommands[userInput]();
      newOutput.push(processCommand(commandResult));
      setCommandContext(null); // Exit socials context after use
    } else if (userInput === "exit") {
      newOutput.push("Exited socials context.");
      setCommandContext(null);
    } else {
      newOutput.push("Command not found");
    }

    setOutput(newOutput); // Set the output state
    setInput(""); // Clear input
  };

  return (
    <div className="terminal-container">
      <div className="terminal-header">Anish's Terminal</div>
      <div className="terminal-output">
        {output.slice(0, currentLineIndex).map((line, index) => (
          <Typewriter
            key={index}
            text={line}
            typeSpeed={50}
            cursorColor="white"
            hideCursorAfterText
          />
        ))}
        {/* Show a loading indicator when typing */}
        {isTyping && <span className="text-green-300">...</span>}
      </div>
      <div className="user-input">
        <span className="user-prompt">PS&gt; </span>
        <input
          ref={inputRef}
          type="text"
          className="flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim()) {
              handleCommandInput(input.trim().toLowerCase());
            }
          }}
        />
      </div>
    </div>
  );

  function processCommand(commandResult) {
    if (commandResult.type === "text") {
      return commandResult.value;
    } else if (commandResult.type === "link") {
      window.open(commandResult.value, "_blank", "noopener,noreferrer");
      return `Opened ${commandResult.value} in a new tab.`;
    } else if (commandResult.type === "clear") {
      return ""; // No output for clear command
    } else {
      return "Command not recognized.";
    }
  }
}

export default Terminal;
