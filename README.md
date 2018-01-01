# Modern Office Git Diff

> An experiment in tracking and diffing versions of modern Microsoft Office files in Git.

Modern Office file formats are ZIP archives with XML files in them.
The ZIP archives are binary files so Git (and furthemore GitHub, GitLab where diff cannot be tweaked) won't display a nice diff for them.
The XML files are not binary, so in order to display a diff for these, this unpacks the ZIP files to directories that are tracked in Git.
Tracking generated files is pretty dumb, but so is tracking binary files and when forced to have one,
it's not a leap to have the other as well if it bring something useful to the table.

This is achieved using a PowerShell script which unpacks the ZIP file to a tracked directory,
formats the XML files for nice diff and tracks the formatted files as well.

**Features:**

- Every Office file (DOCX, XLSX, PPTS) has complementary `.git` directory with XML and TXT files for diffing
- Formatting XML files for nicer diffing
- Generating TXT files from just text nodes for lossy text-only diffing
- Ability to run as a Git hook for worry free tracking

**Drawbacks:**

- Stores compressed *and* uncompressed versions in Git
- No way to prevent getting compressed and uncompressed version out of sync, still independent writeable files and can forget pre-commit hook
- Only supports the new XML-based formats, not the old binary ones
- Online editing at GitHub/GitLab won't (obviously) run the pre-commit hook

**Examples:**

The XML diff captures the exact change whereas the TXT diff captures text-only change for quick content inspection.

- [Example Word diff](https://github.com/TomasHubelbauer/modern-office-xml-git/commit/3413eacaaeb236a06033a443d7979f19207a613b)
- [Example Excel diff](https://github.com/TomasHubelbauer/modern-office-xml-git/commit/5f4ef47d345ab451f17e41ebf0befbc842ff5dba)

## Running

Run `./cmd/version-office-files.ps1` in PowerShell to version Office files manually.
(Use PowerShell ISE or click on the file in VS Code and use PowerShell Integrated Console that will pop up to avoid security error.)
Add a pre-commit hook to do it automatically:

- Set up the pre-commit hook:

```sh
cp .git/hooks/pre-commit.sample .git/hooks/pre-commit
code .git/hooks/pre-commit
```

`.git/hooks/pre-commit`

```sh
#!/usr/bin/env bash
powershell cmd/version-office-files.ps1
```

- Open the files and make some changes
  - `open` on Unix
  - `start` on Windows
- `git add *`
- `git commit -m "Make some changes"`
- See the commit diff for the Office changes

## Studying

See `git log` and [development notes](doc/notes.md).

Some notable prior art:

- [Martin Fenner (2014)](http://blog.martinfenner.org/2014/08/25/using-microsoft-word-with-git/)
- [Ben Balter (2015)](https://ben.balter.com/2015/02/06/word-diff/)
- [Jon Hill (2017)](https://www.ficonsulting.com/filabs/MSOfficeGit)

All of these focus on on-demand (non-tracked) generating of text-only versions of the files, do not capture structure changes.
This project aims to explore the other, potentially less useful, but nonetheless interesting, route of versioning both
the compressed and the uncompressed forms of a file in parallel. See features and drawback for pros and cons.

## Contributing

See [planned development](doc/tasks.md).
