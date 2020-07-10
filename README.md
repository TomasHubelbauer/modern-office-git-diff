# Modern Office Git Diff

![](https://github.com/tomashubelbauer/modern-office-git-diff/workflows/CI/badge.svg)

> An experiment in tracking and diffing versions of modern Microsoft Office files in Git.

Modern Office file formats are ZIP archives with XML files in them.
The ZIP archives are binary files so Git (and furthemore GitHub, GitLab where diff cannot be tweaked) won't display a nice diff for them.
The XML files are not binary, so in order to display a diff for these, this unpacks the ZIP files to directories that are tracked in Git.
Tracking generated files is pretty dumb, but so is tracking binary files and when forced to have one,
it's not a leap to have the other as well if it bring something useful to the table.

This is achieved using a PowerShell script which unpacks the ZIP file to a tracked directory,
formats the XML files for nice diff and tracks the formatted files as well.

> Looking for OpenOffice format support? Check out [Tim Wiel's version](https://github.com/timwiel/libreoffice2git)

**Examples:**

The XML diff captures the exact change whereas the TXT diff captures text-only change for quick content inspection.

- [Example Word diff](https://github.com/TomasHubelbauer/modern-office-xml-git/commit/3413eacaaeb236a06033a443d7979f19207a613b)
- [Example Excel diff](https://github.com/TomasHubelbauer/modern-office-xml-git/commit/5f4ef47d345ab451f17e41ebf0befbc842ff5dba)

**Features:**

- Every Office file (DOCX, XLSX, PPTS) has complementary `.git` directory with XML and TXT files for diffing
- Formatting XML files for nicer diffing
- Generating TXT files from just text nodes for lossy text-only diffing
- Warning in extracted and generated content about read-onliness of the data
- Skipping processing unchanged files for fast operation even in repos with many Office files
- Removing associated generated content automatically for Office files that have been removed from the repo
- Ability to run as a Git hook for worry free tracking

**Limitations:**

- Stores compressed *and* uncompressed versions in Git - by design, for plain text diffing and binary source of truth
- No support for DOC, XLS and PPT, only XLSX, DOCX and PPTX (XML based formats) - by design, no use diffing binary formats
- Risk of getting generated files out of sync if hook is not run or a manual edit is made to the generated files
- Won't process files uploaded to repository through GitHub/GitLab online UI (no pre-commit hook)

**Support:**

- Windows: 10.0.16299+ (`cmd -c ver`)
- Ubuntu: 16.0.0+ (`lsb-release -r`)

## Running

Run PowerShell scripts using VS Code PowerShell Integrated Console to avoid security blocks.
Open it by clicking on any `.ps1` file with integrated terminal open or running the *PowerShell: Show Integrated Console* VS Code command (`F1`+(`p`+`s`+`c`+`i`)).

- Run `cmd/version-office-files.ps1` from the command line
- Run `cmd/edit-in-powrshell-ise.ps1` to open in PowerShell ISE (Integrated Shell Environment)
- Add a Git pre-commit hook:

```sh
cp .git/hooks/pre-commit.sample .git/hooks/pre-commit
code .git/hooks/pre-commit
```

- Paste the contents of [`hook/pre-commit.sh`](hook/pre-commit.sh) into `.git/hooks/pre-commit`.

Observe commit diffs to see Office file changes in the XML and TXT files.

## Testing

Run PowerShell scripts using VS Code PowerShell Integrated Console to avoid security blocks.
Open it by clicking on any `.ps1` file with integrated terminal open or running the *PowerShell: Show Integrated Console* VS Code command (`F1`+(`p`+`s`+`c`+`i`)).

Run `cmd/run-tests.ps1` which will run NodeJS tests in [`test/` (prerequisites)](/test).

In this repository, the tests run together with the main script in a pre-commit hook in order to catch any bugs as soon as possible during development.
When using this script as a tool in a repository other than this one, only the main script would be ran as shown in the Git pre-commit hook setup code.

## Portability

Use WSL (Ubuntu) to test portability of the PowerShell script.
Use `lsb_release -a` to find WSL Ubuntu version and use
[PowerShell Linux installation instructions](https://github.com/PowerShell/PowerShell/blob/master/docs/installation/linux.md)

## To-Do

### Upgrade Node to latest and drop MJS in favor of ESM

### See if VS Code SCM UI could be made to run the hook in PowerShell

The privileges security thing currently makes committing through VS Code fail.

## Contributing

Use [`hook/pre-commit-development.sh`](hook/pre-commit-development.sh) when
contributing to this repository to also run tests.

## Related Works

Derived works based on this project:

- [Tim Wiel (2020)](https://github.com/timwiel/libreoffice2git): derived work for OpenOffice document formats

Some notable prior art:

- [Jon Hill (2017)](https://www.ficonsulting.com/filabs/MSOfficeGit)
- [Ben Balter (2015)](https://ben.balter.com/2015/02/06/word-diff)
- [Martin Fenner (2014)](http://blog.martinfenner.org/2014/08/25/using-microsoft-word-with-git)

All of these focus on on-demand (non-tracked) generating of text-only versions of
the files, do not capture structure changes.
This project aims to explore the other, potentially less useful, but nonetheless
interesting, route of versioning both the compressed and the uncompressed forms of
a file in parallel. See the Features and Limitations sections for pros and cons.
