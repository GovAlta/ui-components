#!/usr/bin/bash

if [ -d playground ]; then
  echo "Playground folder already exists!"
  exit 1
fi

mkdir playground

cp -r ./_templates/angular ./playground
cp -r ./_templates/react ./playground
cp -r ./_templates/web ./playground

mv ./playground/angular/project.json.template ./playground/angular/project.json
mv ./playground/react/project.json.template ./playground/react/project.json
mv ./playground/web/project.json.template ./playground/web/project.json
