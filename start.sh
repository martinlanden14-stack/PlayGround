#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

if [ -n "${RUNTIME_DIR:-}" ] && [ -f "${RUNTIME_DIR}/scripts/default-start.mjs" ]; then
  exec /usr/bin/time -p node "${RUNTIME_DIR}/scripts/default-start.mjs"
fi

exec python3 -m http.server 3002 --directory "$(pwd)"
