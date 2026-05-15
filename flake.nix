{
  description = "GoA ui-component dev environment";
  inputs.flake-utils.url = "github:numtide/flake-utils";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  inputs.playwright.url = "github:pietdevries94/playwright-web-flake";

  outputs = { self, flake-utils, nixpkgs, playwright }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        overlay = final: prev: {
          inherit (playwright.packages.${system}) playwright-test playwright-driver;
        };
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ overlay ];
        };
      in
      {
        devShells = {
          default = pkgs.mkShell {
            buildInputs = [ pkgs.bashInteractive ];
            packages = [
              pkgs.nodejs_24
              pkgs.playwright-test
            ];
            shellHook = ''
              export SHELL=/run/current-system/sw/bin/bash
              export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
              export PLAYWRIGHT_BROWSERS_PATH="${pkgs.playwright-driver.browsers}"
            '';
          };
        };
      });
}
