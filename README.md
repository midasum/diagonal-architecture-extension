# Diagonal Architecture

This small extension adds folder colors and icons to support Diagonal Architecture. In this architecture, the code in `src/domain` does not depend on external libraries (except for a state management library like _tilia_). This helps decouple core business functionality from external services, making the app easier to test and more resilient to change.

![diagonal architecture colored folders](https://raw.githubusercontent.com/midasum/diagonal-architecture-extension/main/extension.png)

**After installing**, set the icon theme to "Diagonal Architecture Icons (Dark)" or "Diagonal Architecture Icons (Light)". You can also use the command "Activate Diagonal Architecture Dark Icon Theme" or "Activate Diagonal Architecture Light Icon Theme" respectively.

## Features

- Command to create the folder structure
- Colors for the folders
- Icons for the folders and files
- Files with `.type.ts` have a special icon (easier to differentiate from implementation)

Here are the folders that have some special meaning in the **Diagonal Architecture**, by order of dependency (lower layers depend on higher layers only):

| Icon | Name                       | Path                  | Description                                                                                                                                                                                                       |
| ---- | -------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 💡   | **domain**                 | `/domain`             | Source of truth for your business rules and vocabulary. It should be easy to test, reason about, and reuse—independent of frameworks and infrastructure.                                                          |
| 🪢   | **api**                    | `/domain/api`         | Groups the public interfaces between different features and integrations.                                                                                                                                         |
| ✒️   | **entity**                 | `/domain/api/entity`  | Provides the types for business objects managed by the application (for example, what a `Todo` or a `User` is). These models are handwritten and documented. They form the basic "vocabulary".                    |
| 🚀️  | **feature api**            | `/domain/api/feature` | Provides the types for business objects managed by the application (for example, what a `Todo` or a `User` is). These models are handwritten and documented. They form the basic "vocabulary".                    |
| 🔌️  | **service api**            | `/domain/api/service` | Provides the types for business objects managed by the application (for example, what a `Todo` or a `User` is). These models are handwritten and documented. They form the basic "vocabulary".                    |
| 🚀   | **feature implementation** | `/domain/feature`     | Contains the implementations of features as defined by the interfaces. Each feature exposes a `make` function that returns the feature based on its dependencies.                                                 |
| 🔌   | **service implementation** | `/service`            | This part manages access to data and external resources (backend, translations). It abstracts the technical details and exposes objects defined by the interfaces, but contains neither cache nor business logic. |
| 🖼️   | **view implementation**    | `/view`               | Provides the user interface.                                                                                                                                                                                      |

## Extension Settings

You can configure the colors to use for each special folder:

**settings.json** (User or Workspace)

```json
{
  "workbench.colorCustomizations": {
    "diagonalArchitecture.api": "#3bf8f8",
    "diagonalArchitecture.feature": "#ff70ff",
    "diagonalArchitecture.service": "#a76844",
    "diagonalArchitecture.view": "#51b837"
  },
  "diagonalArchitecture.badges": {
    "api": "@",
    "feature": ">",
    "service": "~",
    "view": "#"
  }
}
```

## Known Issues

None.

## Related

- We also built [tilia](https://tiliajs.com), an open-source state management library for TypeScript and Rescript with hooks for React.
- We also built [vitest-bdd](https://github.com/midasum/vitest-bdd), a test-runner for Gherkin in Vitest.

## Release Notes

Full [changelog](./CHANGELOG.md).

### 0.1.0

Rename 'model' to 'entity', add domain icon, add command to create folder structure, single theme file.

### 0.0.x

Initial release, colors for "api", "feature", "service", and "view".
