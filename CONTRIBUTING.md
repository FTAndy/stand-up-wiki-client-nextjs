# Contributing to Standup Wiki

## Setting Up Your Environment

1. Fork the repository and clone it locally.
2. Install dependencies with `npm install`.
3. Create a new branch for your contribution.
4. Use the test env MonogoDB database connection link. (NEED TO APPLY). Config the `env.local` file with vars:
```
MONGODB_URI=LINK
NEXT_PUBLIC_ENV='local'
```
5. run `npm run dev`

## Making Changes

1. Update the code with your changes. Keep your code as clean and well-documented as possible.
3. If you're adding a new feature or fixing a bug, please add or update tests.

## Committing Your Changes

- Write clear and concise commit messages describing your changes.
- Include relevant issue numbers in your commit messages.

## Submitting Your Changes

1. Push your changes to your fork.
2. Open a pull request to the main repository.
3. In your pull request, clearly describe the problem and solution. Include the relevant issue number if applicable.
