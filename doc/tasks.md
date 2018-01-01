# Tasks

> Planned development:

## Experiment with being smarter about inserting newlines in the generated TXT files to indicate formatting

**In progress**, implemented, but needs to be scraped. Recognizing block elements is more complex than
using tag names of parent elements to the text nodes as currently implemented in `$*Surround` arrays.

Scrape this as I don't want to make this script understand the Office structure beyond dumb finding text nodes.

## Fix broken skipping unchanged files

Currently skips Office files even if they have changes, probably can't use `git log` but need something else.
