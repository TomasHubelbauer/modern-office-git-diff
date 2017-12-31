# docx-git

An experiment in tracking versions of DOCX files in Git.

## Possible Approaches

### Pre-commit hook which expands the archive so individual files can be tracked and diff'd

Implemented in this repo.

[Git hooks](https://git-scm.com/book/gr/v2/Customizing-Git-Git-Hooks)

```sh
cd .git/hooks
cp pre-commit.sample pre-commit
code pre-commit
```

Git on Windows installs its own Bash. To be able to use `7z` from there we need to add its package to MinGW.

Unfortunately everything about MinGW sucks and it is a piece of shit that should not exist.

That's why we'll use either PowerShell of WSL (in our case the Ubuntu distribution) instead of fighting MinGW!

- `ubuntu` gives me *Permission denied* 
- `powershell`

`pre-commit.sh`

```sh
#!/bin/sh
echo "Pre-commit hook ran"
powershell -c "echo Hello from Ubuntu"
```

### Recompressing with store compression level for plain text readability of the XML components

Diff won't show in VS Code because file is technically still a binary.
This is a bug in VS Code in my opinion but alas.
Will Git/GitHub/GitLab show a diff?

### Others?

[Yes, e.g.](http://blog.martinfenner.org/2014/08/25/using-microsoft-word-with-git/)
