#!/bin/sh
NAME=$(xinput list --name-only | grep ILITEK | grep -v Mouse)
xinput set-prop "$NAME" --type=float "Coordinate Transformation Matrix" 0 -1 1 1 0 0 0 0 1

