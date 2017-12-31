# docx-git

An experiment in tracking versions of DOCX files in Git.

[Try this out](#try-this-out)

[There's prior art to this, I go for something simpler.](http://blog.martinfenner.org/2014/08/25/using-microsoft-word-with-git/)

Modern Office file formats are ZIP archives with XML files in them.

Initially I figured recompressing them using the store method would pretty much turn them into human readable files save for the ZIP header garbage. VS Code diff will still treat them as binary files because of it, though, and I want to avoid reconfiguring the diff tool or the text editor for this. Also, even if this worked, any embedded images and other binary objects would still show up as garbage in the diff (and may cause the diff tool to lose track of individual "files" within the single store archive file), only the plaintext files from the archive would diff properly.

That's why I decided to use a pre-commit hook instead to unpack the Office file before commiting and track the compressed and decompressed versions in parallel. [Learn about Git hooks here.](https://git-scm.com/book/gr/v2/Customizing-Git-Git-Hooks). Obviously a downside to this is that anyone can modify these generated files in the repository. I do not present a solution for this and I do recognize and agree to the fact that tracking generates files in Git is stupid, but then again, so is that with binary files and since I already need to track some binary files why not go stupid all the way and track generated files also. It's for an experiment only so, hey.

I am on Windows and I have installed Git using the official Windows installer. This should immediately raise some eyebrows when it comes to portability. What will Git on Windows do with the hooks? Run them using Batch/PowerShell? No, Git for Windows bundles it's own Bash through MinGW. MinGW has package manager so we could potentially install the `7z` package to it and have a nice, portable script. Ordinarily you install these packages through a MinGW UI, but either I don't know shit or Git doesn't bundle this PM GUI, nor does it bundle the `mingw-get` command for installing these packages. MinGW is horrible anyway so let's figure out a different route.

Since the pre-commit hook will run as a Bash script through MinGW, but we can't manage the MinGW packages, let's settle for the host OS packages/environment. The script will run in the repository root as it's working directory. We can invoke `cmd` or `powershell` here and do the `7z` magic from there maybe? In theory, but why not take it a step further:

On Windows 10, we can invoke `bash` which will pick up the default WSL distro (learn about managing distros using [`wslconfig`](https://docs.microsoft.com/en-us/windows/wsl/wsl-config) to see how to change the default) and we can have that execute our commands. So we can write a Unix script and use that on both Windows and Unix. Problem is, `bash` in MinGW will map to MinGW Bash. `bash.exe` to MinGW Bash, too. I have not had success invoking `bash.exe` so that it actually runs WSL and not MinGW Bash. I managed to somehow not make it work even with full `bash.exe` path (trouble passing script there). One could try and invoke a specific distro directly (`ubuntu` or `opensuse-42`), but that gives a *Permission denied* error as of now because the distro paths go to system & hidden perm'd folder in Windows.

One last alias for `bash.exe` we could use is `wsl`, but while that works fine in Batch and PowerShell, MinGW invoked manually runs it, but MinGW through Git won't. Same problem as with `bash.exe` but without the overriding issue. Can't invoke this for shit.

So yeah, I need to settle for PowerShell.

```sh
cd .git/hooks
cp pre-commit.sample pre-commit
code pre-commit
```

`code .git/hooks/pre-commit`

```sh
#!/usr/bin/env bash
# Use PowerShell on Windows, Bash on Unix
powershell cmd/pre-commit.ps1 || bash cmd/pre-commit.sh
```

## Try this out

- Open the file and make some changes
  - `open Title.docx` on Unix
  - `start Title.docx` on Windows
- `git add Title.docx`
- `git commit -m "Make some changes"`
- See the output and the `out/Title` files diff

## Dry run

There doesn't see to be a good way to dry-run the pre-commit hook. (`git commit --dry-run` doesn't run it.)

Either invoke `powershell cmd/pre-commit.ps1` directly or use PowerShell ISE or just commit stuff.

## Studying

See `git log` and [development notes](doc/notes.md).

## Contributing

See [planned contributions](doc/tasks.md).
