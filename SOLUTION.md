# How to Parse a File from test.yml to entrypoint.php

This document explains how a file path specified in the GitHub Actions workflow file (`test.yml`) is passed to and processed by the PHP script (`entrypoint.php`).

## The Flow

1. **GitHub Actions Workflow (test.yml)**
   - Line 15: `file: clover.example.base.xml`
   - This specifies an input parameter named "file" with the value "clover.example.base.xml"

2. **GitHub Actions Environment**
   - GitHub Actions automatically converts input parameters to environment variables
   - The naming convention is: `INPUT_<PARAMETER_NAME_UPPERCASE>`
   - So "file" becomes the environment variable "INPUT_FILE"

3. **PHP Entrypoint (entrypoint.php)**
   - Line 9: `"file" => getenv('INPUT_FILE')`
   - This retrieves the value of the "INPUT_FILE" environment variable
   - The value is added to an array of arguments that will be passed to the Application class

4. **Application Processing (Application.php)**
   - The Application constructor receives the arguments array
   - In the run() method, it loads the file using `file_get_contents($this->args['file'])`
   - It then parses the XML content using `simplexml_load_string()`
   - Finally, it calculates the code coverage ratio and compares it to a threshold

## Action Configuration (action.yml)

The GitHub Action is configured in `action.yml` to accept the "file" input parameter:

```yaml
inputs:
  file:
    description: 'Path to the Clover XML coverage report'
    required: true
```

This configuration is essential for GitHub Actions to properly pass the parameter from the workflow file to the Docker container as an environment variable.

## Summary

The file path flows from:
1. Workflow file (`test.yml`) as an input parameter
2. To an environment variable (`INPUT_FILE`) in the GitHub Actions environment
3. To the PHP script (`entrypoint.php`) via `getenv()`
4. To the Application class for processing

This is a standard pattern for passing parameters to GitHub Actions.