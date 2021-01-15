# Svelte Reactive Debugger
Easily monitor svelte reactive statements

This extension needs this custom preprocessor to work
https://github.com/unlocomqx/svelte-reactive-preprocessor

## List
The extension displays the statements as they are executed

![panel preview](images/list.png)

## Summary
The statements are grouped to show the total count and duration of each statement

![panel preview](images/summary.png)

# How to build
```shell
npm i && npm i --prefix app
npm run build
```
_Built using node 15.4.0 and npm 7.0.15_
