# gordondelivery

### Requirements
Node version >= 18


### Setup

- `npm install`

### Commands

- First time you start the application you want it to fill up the database with pokemon. 
To do this run `npm run init`

- Subsequent runs is better done using `npm run dev`, so the only difference is that 
this will be ran without the isProcessed flag thus skipping this one time data fetch from
the external pokemon API.

- To test run `npm run test` (this should only be done after the `init` as it will always
run as isProcessed)
