#!/bin/bash
ffmpeg -i "http://freenity.news/files/$1" -f image2 -vframes 1 -ss 00:00:02 "/home/liken88/progbuilder.ru/http/public/files/$1.jpg"