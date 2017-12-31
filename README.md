# Modern Office XML Git

> An experiment in tracking versions of modern Office XML files in Git.

Modern Office file formats are ZIP archives with XML files in them.
The ZIP archives are binary files so Git (GitHub, GitLab where diff cannot be configured) won't display a nice diff for them.
The XML files are not binary, so in order to display a diff for these, I unpack the ZIP files to directories that are tracked in Git.
Tracking generated files is pretty dumb, but so it tracking binary files and when forced to have,
it's not a leap to have the other if it bring something useful to the table.

The way I achieve this is using a [Git pre-commit hook](https://git-scm.com/book/gr/v2/Customizing-Git-Git-Hooks).
The hook unpacks the ZIP file to a tracked directory, formats the XML files for nice diff and tracks the formatted files as well.

I am using PowerShell because it can be used portably and trying to do this in Bash across native shells and MinGW
(which is horrible to work with in the default installation of Git for Windows,
because it lacks `mingw-get` to install dependecies like `7z` and is just generally horrible and terrible and stuff)
would be harder for me.

## Running

- Set up the pre-commit hook:

```sh
cp .git/hooks/pre-commit.sample .git/hooks/pre-commit
code .git/hooks/pre-commit
```

`.git/hooks/pre-commit`

```sh
#!/usr/bin/env bash
powershell cmd/pre-commit.ps1
```

- Open the file and make some changes
  - `open` on Unix
  - `start` on Windows
- `git add *`
- `git commit -m "Make some changes"`
- See the commit diff for the Office changes

Or just make the changes and run the `cmd/pre-commit.ps1` script in PowerShell ISE.

## Studying

See `git log` and [development notes](doc/notes.md).

## Contributing

See [planned development](doc/tasks.md).
