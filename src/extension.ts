import * as vscode from "vscode";

// Keep a reference to the registration so we can dispose it on deactivate
let decorationProviderRegistration: vscode.Disposable | undefined;
let activateLightIconThemeCommand: vscode.Disposable | undefined;
let activateDarkIconThemeCommand: vscode.Disposable | undefined;

const defaultBadges = {
  api: "@",
  feature: "/",
  service: "~",
  view: ">",
};

export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration("diagonalArchitecture");
  let badges = config.get("badges", defaultBadges);
  vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration("diagonalArchitecture.badges")) {
      const config = vscode.workspace.getConfiguration("diagonalArchitecture");
      badges = config.get("badges", defaultBadges);
    }
  });

  const provider: vscode.FileDecorationProvider = {
    provideFileDecoration(uri: vscode.Uri) {
      if (uri.fsPath.includes("src/domain/api")) {
        return {
          badge: badges.api,
          tooltip: "Interfaces and model definitions",
          color: new vscode.ThemeColor("diagonalArchitecture.api"), // cyan
        };
      }
      if (uri.fsPath.includes("src/domain/feature")) {
        return {
          badge: badges.feature,
          tooltip: "Features and use cases",
          color: new vscode.ThemeColor("diagonalArchitecture.feature"), // red variant
        };
      }
      if (uri.fsPath.includes("src/service")) {
        return {
          badge: badges.service,
          tooltip: "External Services",
          color: new vscode.ThemeColor("diagonalArchitecture.service"), // brown
        };
      }
      if (uri.fsPath.includes("src/view")) {
        return {
          badge: badges.view,
          tooltip: "User interface",
          color: new vscode.ThemeColor("diagonalArchitecture.view"), // lime/light green
        };
      }
      return;
    },
  };

  decorationProviderRegistration =
    vscode.window.registerFileDecorationProvider(provider);

  activateLightIconThemeCommand = vscode.commands.registerCommand(
    "diagonalArchitecture.activateLightIconTheme",
    async () => {
      await vscode.workspace
        .getConfiguration()
        .update(
          "workbench.iconTheme",
          "diagonal-architecture-light-icon-theme",
          vscode.ConfigurationTarget.Workspace
        );
      vscode.window.showInformationMessage(
        "Diagonal Architecture light icon theme activated!"
      );
    }
  );

  activateDarkIconThemeCommand = vscode.commands.registerCommand(
    "diagonalArchitecture.activateDarkIconTheme",
    async () => {
      await vscode.workspace
        .getConfiguration()
        .update(
          "workbench.iconTheme",
          "diagonal-architecture-dark-icon-theme",
          vscode.ConfigurationTarget.Workspace
        );
      vscode.window.showInformationMessage(
        "Diagonal Architecture dark icon theme activated!"
      );
    }
  );

  context.subscriptions.push(activateLightIconThemeCommand);
  context.subscriptions.push(activateDarkIconThemeCommand);
  context.subscriptions.push(decorationProviderRegistration);
}

export function deactivate() {
  if (decorationProviderRegistration) {
    decorationProviderRegistration.dispose();
    decorationProviderRegistration = undefined;
  }

  if (activateLightIconThemeCommand) {
    activateLightIconThemeCommand.dispose();
    activateLightIconThemeCommand = undefined;
  }

  if (activateDarkIconThemeCommand) {
    activateDarkIconThemeCommand.dispose();
    activateDarkIconThemeCommand = undefined;
  }
}
