# Tasks

> Planned development:

## Add tests

- Add `test` folder
- Add Word, Excel and PowerPoint files
- Add `.git.chk` directory for "expected"
- Add a script for generating `.git` directories in `test` only for "actual" and running dir diff and checking for no differences

## Verify PowerShell script runs okay on non-Windows PowerShell

I suspect there will be a problem with relying on the XML functionality which is likely to be missing when not on Windows (is .NET).
