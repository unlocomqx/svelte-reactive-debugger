#!/usr/bin/env sh

function crx() {
  /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --pack-extension=$@ --pack-extension-key=$@.pem
}