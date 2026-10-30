#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
if [ -n "${RUNTIME_DIR:-}" ] && [ -f "${RUNTIME_DIR}/scripts/default-start.mjs" ]; then
  /usr/bin/time -p node "${RUNTIME_DIR}/scripts/default-start.mjs"
else
  exec node server.mjs
fi
