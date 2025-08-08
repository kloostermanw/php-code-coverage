# php-code-coverage

This repository is for testing.

## Running Locally

### Option 1: Running bash script
```bash
./run.sh
```

### Option 2: Building and running the bundled version

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run the bundled version
node dist/index.js
```

Note: When running the bundled version directly, you'll need to set environment variables to simulate GitHub Actions inputs:

```bash
INPUT_FILE=path/to/your/file.xml node dist/index.js
```
