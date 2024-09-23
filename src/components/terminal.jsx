import "../index.css";
import commands, { socialsCommands } from "./commands";
import { useState, useRef } from "react";

function Terminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(
    "Hi! I'm Anish's personal assistant! How can I help you? Type 'help' for a list of commands."
  );
  const inputRef = useRef();
  const [commandContext, setCommandContext] = useState(null);

  return (
    <div
      onClick={() => {
        inputRef.current.focus();
      }}
      className="bg-primary text-white drop-shadow h-full w-full overflow-auto p-4 box-border"
    >
      <div className="whitespace-pre-line text-blue-100 drop-shadow-md">
        {output}
      </div>
      <span className="flex text-pink-300 drop-shadow-md mb-50">
        user:&nbsp;
        <input
          ref={inputRef}
          type="text"
          className="border-none outline-none m-0 p-0 bg-transparent color-white w-full text-white drop-shadow"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const userInput = input.trim().toLowerCase();
              let newOutput = output + "\n";

              if (commands.hasOwnProperty(userInput)) {
                const commandResult = commands[userInput]();
                newOutput += processCommand(commandResult);
              } else if (
                commandContext === "socials" &&
                socialsCommands.hasOwnProperty(userInput)
              ) {
                const commandResult = socialsCommands[userInput]();
                newOutput += processCommand(commandResult);
                setCommandContext(null);
              } else {
                newOutput += "Command not found";
              }

              setOutput(newOutput);
              setInput("");
            }
          }}
        />
      </span>
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
