{ pkgs, ... }:

{
  # https://devenv.sh/packages/
  packages = [
    pkgs.git
    pkgs.nodejs_20
    pkgs.nodePackages_latest.svelte-language-server
    pkgs.nodePackages_latest.typescript-language-server
    pkgs.vscode-langservers-extracted
  ];

  # https://devenv.sh/scripts/
<<<<<<< HEAD
  scripts.hello.exec = "echo GoAB UI Components";
=======
  scripts.hello.exec = "echo ABGov UI Components";
>>>>>>> c9699c4d (angular updates)

  enterShell = ''
    git --version
    node --version
    echo
    echo =================
<<<<<<< HEAD
    echo GoAB UI Components
=======
    echo ABGov UI Components
>>>>>>> c9699c4d (angular updates)
    echo =================
  '';

  # https://devenv.sh/languages/
  languages.nix.enable = true;
  languages.typescript.enable = true;

  # https://devenv.sh/pre-commit-hooks/
  pre-commit.hooks.shellcheck.enable = true;

  dotenv.enable = true;
}
