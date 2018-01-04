# Tasks

> Planned development:

## Add a test for the skipping unchanged files

- Run normal test
- Remember the file change date of the text file
- Run test again
- Verify the date has not changed

## Add a test for generated warnings

- Run a normal test
- Verify `README.md` exists and matches expected text
- Verify text file first line is the warning text
- Verify corresponding XML file has the XML comment

## Add a test for disposing of abandoned extraction directories

- Run a normal test
- Delete the Office file
- Run the script again
- Confirm directory doesn't exist anymore

## Add a test for the Git hook code

- Create the Office file
- Set up the Git hook (extract hook code out form the `README.md` file)
- Run Git commit
- Verify extraction directory has been created and text file matches

## Make tests run on each commit in this repo

In normal repo utilizing this script, only the script would run,
but as this is a development repository, tests should run as a
pre-commit hook before the script itself does.

Possibly should utilize GitHub/GitLab CI instead of pre-commit hook?
