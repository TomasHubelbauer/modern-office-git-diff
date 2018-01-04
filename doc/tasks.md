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
- Set up the Git hook by copying over `hook/pre-commit.sh`
- Run Git commit
- Verify extraction directory has been created and text file matches

## Make tests run on each commit in this repo

Flesh out `hook/pre-commit-development.sh` to invoke both scripts.

## Utilize GitHub/GitLab CI on top of the pre-commit hook

This is to capture online editor commits.

## Fix `README.md` MarkDown links to hooks and use inline blocks for their names
