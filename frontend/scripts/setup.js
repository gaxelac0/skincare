var spawnSync = require("child_process").spawnSync;

var styles = {
  success: { open: "\u001b[32;1m", close: "\u001b[0m" },
  danger: { open: "\u001b[31;1m", close: "\u001b[0m" },
  info: { open: "\u001b[36;1m", close: "\u001b[0m" },
  subtitle: { open: "\u001b[2;1m", close: "\u001b[0m" },
};

function color(modifier, string) {
  return styles[modifier].open + string + styles[modifier].close;
}

console.log(color("info", "▶️  Starting project setup..."));

var error = spawnSync("npx --version", { shell: true })
  .stderr.toString()
  .trim();
if (error) {
  console.error(
    color(
      "danger",
      "🚨  npx is not available on this computer. Please install @latest"
    )
  );
  throw error;
}

var command =
  'npx "https://gist.github.com/lucasangelino/d0b755c1fca68dca366e93eab1a60ec7" -q';
console.log(
  color("subtitle", "      Running the following command: " + command)
);

var result = spawnSync(command, { stdio: "inherit", shell: true });

if (result.status === 0) {
  console.log(color("success", "✅  Project setup complete..."));
} else {
  process.exit(result.status);
}

/*
eslint
  no-var: "off",
  "vars-on-top": "off",
*/
