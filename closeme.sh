#!/bin/bash

#PID=$1
#PGID=$(ps opgid= "$PID")
#kill -QUIT -"$PGID"

#pkill text-scro
#pkill text-scroller

kill -9 `ps aux | grep text | awk '{print $2}'`

kill -9 $(pidof text-scroller)
kill -9 $(pidof text-scro)

