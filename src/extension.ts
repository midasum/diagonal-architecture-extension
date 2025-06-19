import * as vscode from "vscode";

// Keep a reference to the registration so we can dispose it on deactivate
let decorationProviderRegistration: vscode.Disposable | undefined;
let activateIconThemeCommand: vscode.Disposable | undefined;
let createFolderStructureCommand: vscode.Disposable | undefined;

const defaultBadges = {
  api: "@",
  feature: "/",
  service: "~",
  test: "°",
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
      if (uri.fsPath.includes("domain/api")) {
        return {
          badge: badges.api,
          tooltip: "Interfaces and model definitions",
          color: new vscode.ThemeColor("diagonalArchitecture.api"), // cyan
        };
      }
      if (uri.fsPath.includes("domain/feature")) {
        return {
          badge: badges.feature,
          tooltip: "Features and use cases",
          color: new vscode.ThemeColor("diagonalArchitecture.feature"), // red variant
        };
      }
      if (uri.fsPath.includes("domain/test")) {
        return {
          badge: badges.test,
          tooltip: "Acceptance tests",
          color: new vscode.ThemeColor("diagonalArchitecture.test"), // yellow variant
        };
      }
      if (uri.fsPath.includes("service")) {
        return {
          badge: badges.service,
          tooltip: "External Services",
          color: new vscode.ThemeColor("diagonalArchitecture.service"), // brown
        };
      }
      if (uri.fsPath.includes("view")) {
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

  activateIconThemeCommand = vscode.commands.registerCommand(
    "diagonalArchitecture.activateIconTheme",
    async () => {
      await vscode.workspace
        .getConfiguration()
        .update(
          "workbench.iconTheme",
          "diagonal-architecture-icon-theme",
          vscode.ConfigurationTarget.Workspace
        );
      vscode.window.showInformationMessage(
        "Diagonal Architecture icon theme activated!"
      );
    }
  );

  createFolderStructureCommand = vscode.commands.registerCommand(
    "diagonalArchitecture.createFolderStructure",
    async (uri?: vscode.Uri) => {
      // 1. Confirm action with the user
      const answer = await vscode.window.showWarningMessage(
        "This will create a diagonal folder structure under the selected folder. Continue?",
        { modal: true },
        "Yes"
      );
      if (answer !== "Yes") {
        return;
      }

      if (!uri) {
        const selected = await vscode.window.showOpenDialog({
          canSelectFolders: true,
          canSelectFiles: false,
          canSelectMany: false,
          openLabel: "Select folder to create structure",
        });
        if (!selected || selected.length === 0) {
          vscode.window.showErrorMessage("No folder selected.");
          return;
        }
        uri = selected[0];
      }

      const folders = [
        ["domain"],
        ["domain", "api"],
        ["domain", "api", "entity"],
        ["domain", "api", "feature"],
        ["domain", "api", "service"],
        ["domain", "feature"],
        ["domain", "test"],
        ["service"],
        ["view"],
      ];

      for (const segments of folders) {
        const folderUri = vscode.Uri.joinPath(uri, ...segments);
        await vscode.workspace.fs.createDirectory(folderUri);
      }

      vscode.window.showInformationMessage(
        "Folder structure created successfully."
      );
    }
  );

  context.subscriptions.push(createFolderStructureCommand);
  context.subscriptions.push(activateIconThemeCommand);
  context.subscriptions.push(decorationProviderRegistration);
}

export function deactivate() {
  if (decorationProviderRegistration) {
    decorationProviderRegistration.dispose();
    decorationProviderRegistration = undefined;
  }

  if (activateIconThemeCommand) {
    activateIconThemeCommand.dispose();
    activateIconThemeCommand = undefined;
  }
}
