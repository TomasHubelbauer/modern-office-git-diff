# Notes

> Development log.

## 2018-01-01

Implemented skipping processing unchanged Office files (using `git diff` to tell if a file has changes) and documented
intended new feature: in text-only TXT file for each XML file, surround block elements by empty lines to set the apart.

## 2017-12-31

Implemented a draft solution for tracking XML changes in modern Office files format.
`git log` from today will reveal all the struggle because I used `git commit` to test the pre-commit hook for posterity.
