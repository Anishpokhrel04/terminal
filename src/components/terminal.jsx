import "../index.css";
import commands, { socialsCommands } from "./commands";
import { useState, useRef, useEffect } from "react";
import Typewriter from "react-typewriter-effect"; // Import the Typewriter component

function Terminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    "Hi! I'm Anish's personal assistant! How can I help you? Type 'help' for a list of commands.",
  ]); 
  const inputRef = useRef();
  const [commandContext, setCommandContext] = useState(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div
      onClick={() => {
        inputRef.current.focus();
      }}
      className="bg-gray-900 text-white h-full w-full overflow-auto p-6 box-border rounded-lg shadow-lg"
    >
      <div
        className="whitespace-pre-line text-green-300 mb-4 terminal-output"
        style={{ minHeight: "80vh" }}
      >
        {/* Use Typewriter component to show the output */}
        {output.map((line, index) => (
          <Typewriter
            key={index}
            text={line}
            typeSpeed={50}
            cursorColor="white"
            startDelay={index * 10} // Delay each line
            hideCursorAfterText
          />
        ))}
      </div>
      <div className="flex items-center">
        <span className="text-pink-400">user:&nbsp;</span>
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent text-white border-none outline-none flex-1 p-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const userInput = input.trim().toLowerCase();
              let newOutput = [...output, `user: ${userInput}`]; // Add user input to output array

              if (commands.hasOwnProperty(userInput)) {
                const commandResult = commands[userInput]();
                newOutput.push(processCommand(commandResult));

                // If the command is "socials", set the command context
                if (userInput === "socials") {
                  setCommandContext("socials");
                }
              } else if (
                commandContext === "socials" &&
                socialsCommands.hasOwnProperty(userInput)
              ) {
                const commandResult = socialsCommands[userInput]();
                newOutput.push(processCommand(commandResult));
                setCommandContext(null);
              } else {
                newOutput.push("Command not found");
              }

              setOutput(newOutput);
              setInput("");
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
      return `Opened ${commandResult.value} in a new tab`;
    } else if (commandResult.type === "clear") {
      window.location.reload();
      return ""; // No output for clear command
    } else {
      return "Command not recognized.";
    }
  }
}

export default Terminal;
