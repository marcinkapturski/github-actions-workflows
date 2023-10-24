# Proof of Concept: GitHub workflow for running Cypress automation


![github-actions-workflow](https://github.com/marcinkapturski/github-actions-workflows/assets/41780000/a843775d-d855-441f-a9f1-bad2d8806e5b)


## 1. POC includes:

Initiating workflows through various events (on schedule, on demand, on pull_request).
- Building packages and a sample React application.
- Running the application locally (via serve -s /build).
- Executing Cypress tests in parallel.
- Reporting results on Slack with custom messages.

## 2. Details of the individual files

### `cy-automation-tests.yml`

This file is only defining on which even workflow will be run it and with which steps
<br />Main workflow is decomposed into "shared workflows"
<br />"shared workflows" are responsible for specific jobs like building, running, reporting

This file defines the conditions under which the workflow will run and the steps it will take. 
<br />The main workflow is broken down into "shared workflows" 
<br />responsible for specific tasks such as building, running, and reporting.

Section `on` explains the events the workflow is waiting for:

- on `schedule` scheduled runs at defined times (based on cron rules, examples: https://crontab.guru/examples.html)
- on `pull_request` triggered when a new pull_request is created.
- triggered manually through workflow_dispatch (a screenshot is presented below in the
- on demand `workflow_dispatch`, by manuall trigering ( a screenshot is presented below in the ![`How to run`](https://github.com/marcinkapturski/github-actions-workflows#3-how-to-run))
  <br />`workflow_dispatch` also allows passing additional values, such as the environment.

```bash
on:
  schedule:
    - cron: "0 8 * * *"
  pull_request:
  workflow_dispatch:
    inputs:
      environment:
        type: choice
        description: "Environment: localhost / dev"
        required: true
        options:
          - localhost
          - dev
        default: "localhost"

```

The 'jobs' section outlines the steps involved, incorporating the content of the 'shared workflows' files.
<br />The `needs` attribute specifies that two other steps, `list-specs` and `build-packages`, must be completed before this step.

```bash
jobs:
  list-specs:
    name: Files
    uses: "./.github/workflows/cy-list-of-specs.yml"

  build-packages:
    name: Build
    uses: "./.github/workflows/cy-build-packages.yml"

  run-specs:
    name: Run
    needs: [list-specs, build-packages]
    if: always()
    uses: "./.github/workflows/cy-run-specs.yml"

```

### `cy-build-packages.yml`

Depending on the event `github.event.inputs.environment == 'localhost' ` `github.event_name == 'pull_request'`
<br />Steps will build project packages, the app for testing and save build folder with the app itself

The steps will build project packages and the app for testing and then save the build folder with the app itself based on specific event conditions, namely, when `github.event.inputs.environment` is set to 'localhost' and 'pull_request'.

        - name: Build packages
            run: yarn

        - name: Build application
            run: yarn build-localhost

        - name: Save build folder
            uses: actions/upload-artifact@v3
            with:
                name: build
                if-no-files-found: error
                path: build


### `cy-list-of-specs.yml`

- Get list of feature files by running script: `/cypress/scripts/getAllSpecs.js`
  <br /> It will return array with list of Feature files from `/cypress/e2e/`

  ```
    [
        "e2e/Sample1.feature",
        "e2e/Sample2.feature"
    ]
  ```

### `cy-run-specs.yml`

If the environment is 'localhost' or the event type will be 'pull_request' then workflow will run demo app on localhost before starting with Cypress tests

```
    - name: Install Serve
        run: yarn global add serve

    - name: Run application on localhost
        run: serve -s ${{ github.workspace }}/build &
```

<br />

`matrix.spec` is a parameter with value from: `/cypress/scripts/getAllSpecs.js`
<br />It will pass array with feature files to the Cypress run

<br />Depending on the event: <br />`github.event.inputs.environment == 'localhost' ` <br /> `github.event_name == 'pull_request'` <br /> `github.event_name == 'schedule'`
<br /> it will run tests on localhost or on dev environment

```
      - name: Run Tests on LOCALHOST
        uses: cypress-io/github-action@v4
        with:
          install: true
          wait-on: "http://localhost:3000"
          wait-on-timeout: 120
          browser: chrome
          spec: cypress/${{ matrix.spec }}
          config-file: /${{ github.workspace }}/cypress/configs/cypress.localhost.config.js

      - name: Run Tests on DEV
        uses: cypress-io/github-action@v4
        with:
          install: true
          browser: chrome
          spec: cypress/${{ matrix.spec }}
          config-file: /${{ github.workspace }}/cypress/configs/cypress.dev.config.js

```

At the end it will create artifacts with screenshots and videos from the test run

<br />

### `cy-slack-reporting.yml`

First will gader all informations about test run like: status of the run, event name, environment, branch name
<br /> Then will run node script: `/slack/success_message.js` or `/slack/failed_message.js`

<!-- ## Description of the parallel tests run (strategy -> matrix) -->

<br />

## 3. How to run

![cypress-web-workflow](https://user-images.githubusercontent.com/41780000/222984680-80f2d12b-b026-4d30-bf15-50104cd6cd92.png)

Select 'Run WEB Automation' from the Actions tab or go to that workflow directly: <br />
https://github.com/marcinkapturski/github-actions-workflows/actions/workflows/cy-automation-tests.yml
