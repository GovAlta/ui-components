#!/usr/bin/env bash
# Sync the content-generators output into the dcp-monorepo MCP's data/.
# Manual invocation, no idempotency checks, no PR generation.
# Phase 4 replaces this with an automated CI step.
#
# Set DCP_MONOREPO_DATA to the local path of dcp-monorepo's design-system-mcp
# data folder. Example:
#   export DCP_MONOREPO_DATA=/path/to/dcp-monorepo/apps/design-system-mcp/data
#   bash docs/src/scripts/content-generators/sync-to-dcp.sh

set -euo pipefail

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../generated/mcp" && pwd)"
DEST="${DCP_MONOREPO_DATA:-}"

if [[ -z "$DEST" ]]; then
  echo "[sync] DCP_MONOREPO_DATA env var not set." >&2
  echo "[sync] Set it to the path of dcp-monorepo's design-system-mcp data folder." >&2
  echo "[sync] Example: export DCP_MONOREPO_DATA=/path/to/dcp-monorepo/apps/design-system-mcp/data" >&2
  exit 1
fi

if [[ ! -d "$SRC" ]]; then
  echo "[sync] Source not found: $SRC" >&2
  echo "[sync] Run: npx tsx docs/src/scripts/content-generators/index.ts" >&2
  exit 1
fi

if [[ ! -d "$DEST" ]]; then
  echo "[sync] Destination not found: $DEST" >&2
  exit 1
fi

echo "[sync] Clearing old subfolders in $DEST..."
rm -rf \
  "$DEST/components" \
  "$DEST/examples" \
  "$DEST/guidance" \
  "$DEST/foundations" \
  "$DEST/get-started" \
  "$DEST/productTypes" \
  "$DEST/design" \
  "$DEST/development"

echo "[sync] Copying $SRC -> $DEST"
cp -R "$SRC/." "$DEST/"

for c in components examples guidance foundations get-started productTypes; do
  if [[ -d "$DEST/$c" ]]; then
    count=$(find "$DEST/$c" -type f -name '*.json' | wc -l | tr -d ' ')
    echo "  $c: $count files"
  fi
done

echo "[sync] Done."
