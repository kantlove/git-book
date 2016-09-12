## Useful Commands
- `gulp build`: build *.ts and *.sass files.
- `gulp watch`: watch for change in *.ts and *.sass and run `gulp build`.
- `gulp test` | `npm test`: run tests.
- `npm start`: run `gulp build` and then start the app as a *NodeJs* app.

## Git Workflow
Branch `master` should contain only *version* branch.
To start a new version:

- Create a new branch `version/a.b` from `master`.
- For each feature, create `feature/x` from `version/a.b`.
- When your work W (a feature or a version) is done:
  
  - Create branch `candidate/W`.
  - Run `git rebase` on the parent branch P (`version/a.b` for feature and `master` for version) and check to make sure everything is **good**.
  - Merge `candidate/W` into P.

- Create a release on Github.
- Clean unnecessary branches.

## Added Services
Here is a list of external services that are added to help the development.

### Editor Config
**Files:** .editorconfig

Help preserving a same workspace config accross text editors.

### Travis CI
**Files:** .travis.yml

Automatically build and test on `git push`.

### Linters
**Files:** .tslint.json, sass-lint.yml
