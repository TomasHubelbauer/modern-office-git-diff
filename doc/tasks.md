# Tasks

> Planned development:

## Experiment with being smarter about inserting newlines in the generated TXT files to indicate formatting

**In progress**, next populate `wordSurround`, `excelSurround` and `powerPointSurround` with block element tag names.

- For each office format (Word, Excel, PowerPoint), keep a list of special tag names
- For each text node check if parent tag name is in the list
  - Yes: append a newline, append the text node value, append another two newlines (indicate a block element)
  - No: append the text node value and a newline (indicate an inline element)

In both cases newlines are appended, not spaces or nothing for inline elements to avoid long, hard to spot diff lines.

Lines followed by other lines will indicate separate inline elements.

Lines surrounded by empty lines will indicate block elements.
