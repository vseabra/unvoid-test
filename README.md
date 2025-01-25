# Unvoid Logic Test

With [NodeJS v20](https://nodejs.org/en/) (or superior) installed, run the following scripts:

- `npm clean-install` to install the project dependencies
- `npm test` to run the tests

`lodash` and `date-fns` are already installed, feel free to use them. You can also install other libraries if you want to.

You can also create new files or restructure the code if it makes your solution cleaner or easier to maintain. However, you must not delete or modify the tests.

## Description

Imagine this scenario: You're working on a scheduling application that allows patients to schedule consultations with doctors. Patients should be able to schedule consultations only when the doctors are available. For simplicity, all dates used in the tasks are in UTC. That means you don't need to worry about timezone conversions.

This test consists of 5 tasks that will be important to identify when the doctors are available. The 5 tasks are in the `src/` folder and there's a README for each task. We recommend you do them in order because they might depend on each other.

You have 4 hours (since downloading this project) to implement these functions and pass the tests.

**Passing the tests is not a guarantee of passing the selection process. We will also evaluate your code quality.**

## Submission

When you’re ready to submit your solution:

1. Run `npm run pre-upload` to generate a `.tar.gz` file, which will be created in the `uploads` directory
2. Upload the generated file in the test page
