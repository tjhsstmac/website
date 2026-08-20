#!/bin/sh
set -eu

if [ ! -f dist/index.html ]; then
    echo "dist/index.html not found. Build the site before restarting Director."
    exit 1
fi

exec npx serve -s dist -l "${PORT:-80}"
