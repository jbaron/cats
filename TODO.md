For CATS to become a fullblown editor, many things still need to happen:

1. Introduce a File mananger.
2. Compile the TS files, not just perform autocomplete. / DONE
3. Put the CPU intensive tasks in a web worker (or some other mechanism) to avoid GUI lockups. / DONE
4. Introduce basic refactoring support.
5. Version control support (at least git).
6. I'm sure I forgot many things to mention on this list.

However the good thing is that it didn't take very long to get basic autocompletion to work. And most of that was becuase there is no documentation yet on how to use the TS language services API.

