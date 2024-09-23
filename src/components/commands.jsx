const commands = {
  /* define each command as an object, with type either text or link, value being what is returned in the output, and context sets the state for further nested commands */
  help: () => ({
    /* if user types help, display list of commands */
    type: "text" /* type is either text or link. Add new types in terminal.jsx file */,
    /* value is what is returned in the output */
    value:
      "Available commands: \b\n" +
      "'website' - view my portfolio \b\n" +
      "'hi' - say hello to me \b\n" +
      "'clear' - clear the terminal \b\n" +
      "'socials' - view a list of my social media accounts \b\n" +
      "'about' - learn more about me \b\n" +
      "'contact' - send me an email \b\n",
    /* !todo	"'more commands", */
  }),
  about: () => ({
    type: "text",
    value:
      "Hi! My name is Anish Pokhrel, and I'm a Frontend Developer. I specialize in building user interfaces using React.js and have nearly 1.5 years of experience in web development. \b\n" +
      "I enjoy creating dynamic, responsive, and intuitive web applications. I'm constantly learning and improving my skills in JavaScript, CSS, and various frontend frameworks. \b\n" +
      "When I'm not coding, I like to explore new technologies, read tech blogs, or unwind with a good movie. \b\n",
  }),

  hi: () => ({ type: "text", value: "Hello! :)" }),

  contact: () => ({ type: "link", value: "pokhrelanish001@gmail.com" }),
  website: () => ({
    type: "link",
    value: "https://anishpokhrell.netlify.app",
  }),
  socials: () => ({
    type: "text",
    value:
      "What social media account would you like to visit: \b\n" +
      "'github' - My github account \b\n" +
      "'linkedin' - My linkedin account \b\n" +
      "'instagram' - My instagram account \b\n",
    context: "socials",
  }),
  clear: () => ({
    type: "clear",
  }) /* clear performs a window reload, and has no output */,
};

const socialsCommands = {
  github: () => ({ type: "link", value: "https://github.com/Anishpokhrel04" }),
  linkedin: () => ({
    type: "link",
    value: "https://www.linkedin.com/in/anish-pokhrel-967048295/",
  }),
  instagram: () => ({
    type: "link",
    value: "https://www.instagram.com/anish_aatreya/",
  }),
};

export default commands;
export { socialsCommands };
