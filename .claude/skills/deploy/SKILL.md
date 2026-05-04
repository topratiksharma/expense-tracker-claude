Run the full deploy pipeline: tests → production build → push to staging.

## Steps

### 1. Run tests
Check if a test script exists in package.json. If it does, run `npm test`. If there is no test script configured, print a warning and continue.

### 2. Build production bundle
Run `npm run build`. If the build fails, stop immediately and report the error — do not proceed to staging.

### 3. Push to staging
Run `git push origin main:staging`. If the `staging` remote branch does not exist yet, create it with `git push origin main:staging --set-upstream`. Report success or failure.

## After each step
Print a short status line: ✓ step passed or ✗ step failed (with the error). Only proceed to the next step if the current one passed.
