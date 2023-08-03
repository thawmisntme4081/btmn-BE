#! /bin/bash

# A script to quickly commit, and push it up.

set -eo pipefail

current_branch=$(git rev-parse --abbrev-ref HEAD)

if [ "$current_branch" != master ] && [ "$current_branch" != main ]; then
  echo WARNING: YOU BRANCHED OF OFF "$current_branch", not main or master.
fi

if [ -z "$1" ]; then
  echo ERROR: Must have description
  exit 1
fi

description=$1

git add .
git commit -m "$description"
git push origin
