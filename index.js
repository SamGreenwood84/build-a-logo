const fs = require("fs");
const inquirer = require("inquirer");
const { Circle, Square, Triangle } = require("./lib/shapes");

console.log(
  "Let's build-a-logo! This easy-to-use CLI tool takes your desired input and generates a simple clean logo!"
);
console.log(
  "Enter 3 Initials in the font and background color of your choice with 3 shapes to choose from!"
);
console.log(
  ".........................................................................................."
);

// Function to dynamically load svgGenerator based on user input
function loadSvgGenerator(shape) {
  switch (shape.toLowerCase()) {
    case "circle":
      return new Circle();
    case "square":
      return new Square();
    case "triangle":
      return new Triangle();
    default:
      return null;
  }
}

const InputChoices = [
  {
    type: "input",
    name: "text",
    message: "Add 3 initials here",
    validate: function (input) {
      // Check if the input consists of exactly 3 characters
      const isThreeInitials = /^[a-zA-Z]{3}$/.test(input);

      if (isThreeInitials) {
        return true;
      }

      return "Please enter exactly 3 initials";
    },
  },
  {
    type: "input",
    name: "textColor",
    message: "Choose your text color (name or hexidecimal #)",
    validate: function (input) {
      // Check if the input is a valid color name or hex code
      const isColorName = /^([a-zA-Z]+)$/i.test(input);
      const isHexCode = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/i.test(input);

      if (isColorName || isHexCode) {
        return true;
      }

      return "Please enter a valid color name or hexadecimal color code";
    },
  },
  {
    type: "input",
    name: "backgroundColor",
    message: "Choose your background color (name or hexidecimal #)",
    validate: function (input) {
      // Check if the input is a valid color name or hex code
      const isColorName = /^([a-zA-Z]+)$/i.test(input);
      const isHexCode = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/i.test(input);

      if (isColorName || isHexCode) {
        return true;
      }

      return "Please enter a valid color name or hexadecimal color code";
    },
  },
  {
    type: "list",
    name: "shape",
    message: "Choose your shape",
    choices: ["Circle", "Square", "Triangle"],
  },
];

function generateSVG(choices) {
  const svgGenerator = loadSvgGenerator(choices.shape);

  if (!svgGenerator) {
    console.error("Invalid shape selected");
    return "";
  }

  return svgGenerator(choices);
}
function writeToFile(filename, data) {
  const filePath = `${process.cwd()}/${filename}`;

  fs.writeFile(filePath, data, "utf8", (err) => {
    if (err) {
      console.log(`Failed to create ${filename}`);
      console.error(err);
    }
  });
}

function generateSVG(choices) {
  const svgGenerator = loadSvgGenerator(choices.shape);

  if (!svgGenerator) {
    console.error("Invalid shape selected");
    return "";
  }

  svgGenerator.text = choices.text;
  svgGenerator.textColor = choices.textColor;
  svgGenerator.backgroundColor = choices.backgroundColor;

  return svgGenerator.render();
}

function startChoices() {
  inquirer.prompt(InputChoices).then(confirmAndGenerateSVG);
}

startChoices();
