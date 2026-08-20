#!/bin/sh
set -eu

npm ci
npm run build

exec ./node_modules/.bin/vite preview --host 0.0.0.0 --port "${PORT:-80}" --strictPort
