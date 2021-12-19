module.exports = {
  "*.{j,t}s{x,}": ["organize-imports-cli", "prettier --write"],
  "*": "prettier --write --ignore-unknown",
};
