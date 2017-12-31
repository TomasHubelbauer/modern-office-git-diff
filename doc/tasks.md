# Tasks

> Planned development:

- Delete `$officeFile.git` directories without matching files where encountered
- Fix adding only XML files because there can also be non-XML files (thumbnails and others) which currently have to be added manually
  - Do one `git add` on the whole `.git` directory instead
- Experiment with generating `.txt` file within the `.git` directory with just text nodes extracted from XML for lossy text-only diff
