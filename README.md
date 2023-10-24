# github-action-workflows-cypress

This is example of GitHub workflow for running Cypress tests

## Workflow includes:

- building all packages ( yarn install )
- building the app locally ( yarn build)
- running the app locally ( serve -s /build )
- run Cypress tests in different modes (on schedule, on demand, on pull_request) as parallel run
- report results on Slack for better visibility

# Shared workflow: cy-build-packages.yml

# Shared workflow: cy-list-of-specs.yml

# Shared workflow: cy-run-specs.yml

# Shared workflow: cy-slack-reporting.yml

# Main workflow: cy-automation-tests.yml

- building all packages ( yarn install )
- building the app locally ( yarn build)
- running the app locally ( serve -s /build )
- run Cypress tests as a strategy matrix for parallel run
- run workflow in different modes (on schedule, on demand, on pull_request)
- report results on Slack for better visibility

Workflow is decomposed into parts, call as "shared workflows"

##

## Workflow structure

# Run tests on different actions

## Run tests on localhost

## Run tests on DEV environment

## Run test on Pull Request

## Run test on schedule

### JavaScript getAllFiles.js, getAllSpecs.js scripts

## Description for Run parallel tests (strategy -> matrix)
