# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. 
The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur


### Firebase

to open general firebase things
firebase init

to build local copy of app and deploy manually from local machine - do not use this
vite build && firebase deploy

### TIAGA Integration - https://docs.taiga.io/changing-elements-status-via-commit-message.html
Add `TG-REF #STATUS-slug` to commit summary or description to change TIAGA ticket status
- Example: 
- `TG-123 #in-progress`
- `TG-123 #in-pr`
- `TG-123 #done`
- Example: `TG-12 updated readme to relfect changes...`

### To Integrate github desktop or git with TIAGA 
this will...
AUTO pre-pend pre commit messages with TG-XX

- navigate to /.git/hooks
- create file named `prepare-commit-msg`
- add the following to the file

```
#!/bin/sh
branch=$(git symbolic-ref --short HEAD)
echo "$branch: $(cat "$1")" > "$1"
```

- restart github desktop