Notes for Ethan bc he has two braincells to run together

urlButton is the main renderer function where everything gets rendered. then each item or button is added into its logic

linkedin is the parent file to urlButton for some reason


#Issue 
pnpm run build
        > @extension/zipper@0.3.5 ready /Users/ethan-rng/Documen
        │ ts/GitHub/WAI/extension-react/packages/zipper
        │ > tsc
        │ 
        │ lib/zip-bundle/index.ts:35:17 - error TS2345: Argument o
        │ f type '(chunk: Buffer) => void' is not assignable to pa
        │ rameter of type '(chunk: string | Buffer) => void'.
        │   Types of parameters 'chunk' and 'chunk' are incompatib
        │ le.
        │     Type 'string | Buffer' is not assignable to type 'Bu
        │ ffer'.
        │       Type 'string' is not assignable to type 'Buffer'.
        │ 
        │ 35     .on('data', (chunk: Buffer) => data.push(chunk, f
        │ alse))
        │                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        │ ~~~~~
        │ 
        │ 
        │ Found 1 error in lib/zip-bundle/index.ts:35
        │ 
        │  ELIFECYCLE  Command failed with exit code 2.
        │ command finished with error: command (/Users/ethan-rng/D
        │ ocuments/GitHub/WAI/extension-react/packages/zipper) /Us
        │ ers/ethan-rng/.nvm/versions/node/v22.13.1/bin/pnpm run r
        │ eady exited (2)
        └────>
        @extension/zipper#ready: command (/Users/ethan-rng/Documents/GitHub/WAI/extension-react/packages/zipper) /Users/ethan-rng/.nvm/versions/node/v22.13.1/bin/pnpm run ready exited (2)

        Tasks:    6 successful, 7 total
        Cached:    6 cached, 7 total
        Time:    1.224s 
        Failed:    @extension/zipper#ready

        ERROR  run failed: command  exited (2)
         ELIFECYCLE  Command failed with exit code 2.

#FIX 
    .on('data', (chunk: string | Buffer) => {
      if (typeof chunk === 'string') {
        // Convert string to Buffer
        data.push(Buffer.from(chunk), false);
      } else {
        // Handle Buffer directly
        data.push(chunk, false);
      }
    })