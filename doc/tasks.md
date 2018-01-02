# Tasks

> Planned development:

## Add tests

- Use [officegen](https://www.npmjs.com/package/officegen) to generate files in a temp directory
- Insert spans with various formatting options depending on the format kind
- Run the PowerShell script on the generated files
- Check the text-only generated files to see if captured spans are there
- Also test checking for unchanged files etc.

`node --experimental-modules test.mjs`

```js
// https://www.npmjs.com/package/officegen
import codegen from 'codegen';

const word = codegen('0133…');
// Change `on('finalize') and on('error') to deferred promises to utilize `async`/`await`
```

## Verify PowerShell script runs okay on non-Windows PowerShell

I suspect there will be a problem with relying on the XML functionality which is likely to be missing when not on Windows (is .NET).
