# docx-git

An experiment in tracking versions of DOCX files in Git.

## Possible Approaches

### Pre-commit hook which expands the archive so individual files can be tracked and diff'd

Implemented in this repo.

### Recompressing with store compression level for plain text readability of the XML components

Diff won't show in VS Code because file is technically still a binary.
This is a bug in VS Code in my opinion but alas.
Will Git/GitHub/GitLab show a diff?

### Others?

[Yes, e.g.](http://blog.martinfenner.org/2014/08/25/using-microsoft-word-with-git/)
