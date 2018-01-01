# Notes

> Development log.

## 2018-01-01

Implemented skipping processing unchanged Office files (using `git diff` to tell if a file has changes).

Attempted recognizing block elements to surround them with blank lines in TXT file to make them stand out, abandon,
too complex to tell what should be block span and do not want the script to understand the XML structure beyond
simple picking out text nodes.

## 2017-12-31

Implemented a draft solution for tracking XML changes in modern Office files format.
`git log` from today will reveal all the struggle because I used `git commit` to test the pre-commit hook for posterity.
