#!/bin/bash

#PID=$1
#PGID=$(ps opgid= "$PID")
#kill -QUIT -"$PGID"

#pkill text-scro
#pkill text-scroller



# original:
kill -9 `ps aux | grep text | awk '{print $2}'`

kill -9 $(pidof text-scroller)
kill -9 $(pidof text-scro)

# updated with texture:

# Kill processes matching "text" from ps and led-image-viewer
# kill -9 $(ps aux | grep text | grep -v grep | awk '{print $2}')
# kill -9 $(ps aux | grep led-image-viewer | grep -v grep | awk '{print $2}')

# # Kill processes specifically named "text-scroller" and "led-image-viewer"
# kill -9 $(pidof text-scroller)
# kill -9 $(pidof led-image-viewer)
