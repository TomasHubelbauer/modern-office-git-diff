# docx-git

An experiment in tracking versions of DOCX files in Git.

## Possible Approaches

### Pre-commit hook which expands the archive so individual files can be tracked and diff'd

Implemented in this repo.

[Learn about Git hooks here.](https://git-scm.com/book/gr/v2/Customizing-Git-Git-Hooks)

```sh
cd .git/hooks
cp pre-commit.sample pre-commit
code pre-commit
```

I'm on Windows and I'm using the default Git for Windows installer.
This installed installs its own Bash for Git powered by MinGW.

Initially I thought I could just install the `z7` package to MinGW, but then I remembered MinGW is a worthless piece of crap.

I tried invoking `ubuntu` to utilize WSL on Windows 10, but it failed with *Permission denied* error.

I tried invoking `powershell` and it works, but like WSL is locked to Windows only.
Powershell can be installed for Linux as well and the PowerShell package could probably be added to MinGW to make it portable, but see above.

I tried invoking `bash` and it worked, so specific distros don't work, but `bash` which defaults to default distro does.
See about `wslconfig` for how to configure default distro and manage WSL distros.

I ended up using `bash` because I like it nicer than PowerShell.

`pre-commit.sh`

```sh
#!/bin/sh
bash cmd/pre-commit.sh
```

### Recompressing with store compression level for plain text readability of the XML components

Diff won't show in VS Code because file is technically still a binary.
This is a bug in VS Code in my opinion but alas.
Will Git/GitHub/GitLab show a diff?

### Others?

[Yes, e.g.](http://blog.martinfenner.org/2014/08/25/using-microsoft-word-with-git/)
