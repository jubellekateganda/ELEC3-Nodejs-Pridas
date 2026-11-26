// Full name: Jubelle Kate Pridas
// Section: IV-BSIT C
// Activity code: N3
// Date: November 27, 2026

const fs = require("node:fs");
const path = require("node:path");

const filesDirectory = path.join(__dirname, "files");
const fileCommands = ["create", "read", "update", "delete"];

function isTextFileName(name) {
  const isSimpleTextName = /^[a-z0-9][a-z0-9 _.()-]*\.txt$/i.test(name);
  const isWindowsDevice =
    /^(?:con|prn|aux|nul|com[0-9]|lpt[0-9])(?:[. ]|$)/i.test(name);
  return isSimpleTextName && !isWindowsDevice;
}

function listFiles() {
  const entries = fs.readdirSync(filesDirectory, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort((first, second) => first.localeCompare(second));

  console.log("Files (" + files.length + "):");
  for (const name of files) {
    const filePath = path.join(filesDirectory, name);
    const contents = fs.readFileSync(filePath, "utf8").trimEnd();
    console.log(path.basename(filePath) + " | " + path.extname(filePath));
    console.log("Path: " + filePath);
    console.log("Contents: " + contents);
  }
}

function runFileCommand(command, name, text) {
  const filePath = path.join(filesDirectory, name);

  if (command === "create") {
    // Exclusive creation preserves any file that already has this name.
    fs.writeFileSync(filePath, text + "\n", { encoding: "utf8", flag: "wx" });
    console.log("Created: " + name);
    return;
  }

  if (!fs.lstatSync(filePath).isFile()) {
    throw new Error("Choose a regular text file.");
  }

  if (command === "read") {
    console.log(
      "Contents of " +
        name +
        ":\n" +
        fs.readFileSync(filePath, "utf8").trimEnd(),
    );
  } else if (command === "update") {
    // Append to an existing file without creating a missing one.
    fs.appendFileSync(filePath, text + "\n", {
      encoding: "utf8",
      flag: fs.constants.O_WRONLY | fs.constants.O_APPEND,
    });
    console.log("Updated: " + name);
  } else {
    fs.unlinkSync(filePath);
    console.log("Deleted: " + name);
  }
}

function main() {
  const [command, name = "", ...content] = process.argv.slice(2);
  if (command !== "list" && !fileCommands.includes(command)) {
    console.error(
      "Usage: node index.js <create|read|update|delete|list> [file.txt] [text]",
    );
    return 1;
  }

  if (command !== "list" && !isTextFileName(name)) {
    console.error("Enter a .txt file name without a folder path.");
    return 1;
  }

  const text = content.join(" ");
  if ((command === "create" || command === "update") && !text.trim()) {
    console.error("Enter text to write to the file.");
    return 1;
  }

  try {
    fs.mkdirSync(filesDirectory, { recursive: true });
    if (command === "list") {
      listFiles();
    } else {
      runFileCommand(command, name, text);
    }
    return 0;
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("File not found: " + name);
    } else if (error.code === "EEXIST") {
      console.error("File already exists: " + name);
    } else {
      console.error("File operation failed: " + error.message);
    }
    return 1;
  }
}

if (require.main === module) {
  process.exitCode = main();
}
