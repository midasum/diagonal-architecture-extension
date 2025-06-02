# Diagonal Architecture

This small extension adds folder colors and icons to support Diagonal Architecture. In this architecture, the code in `src/domain` does not depend on external libraries (except for a state management library like _tilia_). This helps decouple core business functionality from external services, making the app easier to test and more resilient to change.

![diagonal architecture colored folders](https://raw.githubusercontent.com/midasum/diagonal-architecture-extension/main/extension.png)

**After installing**, set the icon theme to "Diagonal Architecture Icons (Dark)" or "Diagonal Architecture Icons (Light)". You can also use the command "Activate Diagonal Architecture Dark Icon Theme" or "Activate Diagonal Architecture Light Icon Theme" respectively.

## Features

Here are the folders that have some special meaning in the **Diagonal Architecture**, by order of dependency (higher layers depend on lower layers only):

| Icon | Name        | Path                    | Description                                                                                                                                                                                                                                                          |
| ---- | ----------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️   | **view**    | `/src/view`             | Provides the user interface.                                                                                                                                                                                                                                         |
| 🚀   | **feature** | `/src/domain/feature`   | Contains the implementations of features as defined by the interfaces. Each feature exposes a `make` function that returns the feature based on its dependencies.                                                                                                    |
| ✒️   | **model**   | `/src/domain/api/model` | Provides the types for business objects managed by the application (for example, what a `Todo` or a `User` is). These models are handwritten and documented. They form the basic "vocabulary".                                                                       |
| 🪢   | **api**     | `/src/domain/api`       | Groups the public interfaces between different features and integrations. These are the "contracts" that features establish between themselves and with the interface. For feature interfaces, these can be seen as the code expression of a "need" or a "use case". |
| 🔌   | **service** | `/src/service`          | This part manages access to data and external resources (backend, translations). It abstracts the technical details and exposes objects defined by the interfaces, but contains neither cache nor business logic.                                                    |

## Extension Settings

You can configure the colors to use for each special folder:

```json
// settings.json
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

## Release Notes

### 1.0.0

Initial release, colors for "api", "feature", "service", and "view".
