# Contributing

## Prerequisite

> Node.js >= v12
> npm >= v6.14

## Environment Variables

|Key              | Default Value    |Description                             |
|-----------------|------------------|----------------------------------------|
|PORT             |80                |The port on which the server will start.|

## Commands

`npm run lint`
> This command check the linting issues in the code base.

`npm start`
> This command starts the server in the production environment.

`npm run build`
> Compiles the typescript files into the es6 javascript files into dist/ folder.

`npm run generate-api-doc`
> Compiles the swagger document from swagger/ folder into docs/api-doc.yml file.

`npm test`
> Runs the unit test using Jest testing framework, written in tests/ folder.

`./node_modules/.bin/knex migrate:make {migration_name}`
> Creates a database migration script in the migrations/ folder.
> Standards for **migration_name** (Note: table_name and short_description should be *snake_cased*):
>
> - table_create_{table_name}
> - table_alter_{short_description}
> - table_drop_{table_name}

`./node_modules/.bin/knex migrate:latest`
> Run the latest migration scripts from migrations/ folder

## Starting the server

1. **Fork** and clone the repository.
2. Configure and install the dependencies: `npm install`
3. Make sure the tests pass on your machine: `npm test`, note: these tests also apply the **linter**, so there's no need to run this command separately.
4. Build the typescript files into javascript: `npm run build`
5. Start the server: `npm start`

## Submitting  a pull request

1. **Fork** and clone the repository.
2. Configure and install the dependencies: `npm install`
3. Make sure the tests pass on your machine: `npm test`, note: these tests also apply the **linter**, so there's no need to run this command separately.
4. Create a new branch: `git checkout -b my-branch-name`
5. Make your changes, add tests, and make sure all the test cases pass
6. Update the CHANGELOG.md file
7. Push to your fork and submit a pull request
8. Wait for your pull request to be reviewed and merged.

Here are a few things you can do that will increase the likelihood of your pull request being accepted:

- Follow the style guide which is using standard. Any linting errors should be shown when running `npm test`
- Write and update tests.
- Keep your change as focused as possible. If there are multiple changes you would like to make that are not dependent upon each other, consider submitting them as separate pull requests.
- Write a [good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

## Merging the Pull Request & releasing a new version

The following three commit message conventions determine which version is released:

1. `fix: ...` or `fix(scope name): ...` prefix in subject: bumps fix version, e.g. `1.2.3` → `1.2.4`
2. `feat: ...` or `feat(scope name): ...` prefix in subject: bumps feature version, e.g. `1.2.3` → `1.3.0`
3. `BREAKING CHANGE:` in body: bumps breaking version, e.g. `1.2.3` → `2.0.0`

Only one version number is bumped at a time, the highest version change trumps the others. Besides publishing a new version, create a git tag and release on GitHub, update change logs and puts them into the release notes.

## Resources

- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)
- [GitHub Help](https://help.github.com)
