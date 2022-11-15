```mermaid
%%{ init: { 'flowchart': { 'curve': 'bump' } } }%%
graph LR;
  SPA(((SPA)))
  SPA-->index.html;
  
  index.html---CSS;
  index.html---JavaScript;

  CSS-->index.css;
  JavaScript-->index.mjs;

  subgraph HTML5;
    index.html;
  end;

  subgraph CSS3;
    index.css-->help.css;
    index.css-->landing.css;
    index.css-->terminal.css;
    index.css-->windows.css;
  end;

  subgraph JavaScript -> E6, E7,E8,E9,E10,E11, E12;
    index.mjs-->landing.mjs-->setting.mjs;
    index.mjs-->hr.mjs-->setting.mjs;
    index.mjs-->gamer.mjs-->setting.mjs;
    index.mjs-->geek.mjs-->terminal.mjs;

    terminal.mjs-->buidincmds.mjs;
    terminal.mjs-->worker-terminal.mjs;

    worker-terminal.mjs-->buidincmds.mjs;
    
    buidincmds.mjs-->setting.mjs;
    buidincmds.mjs-->help.mjs-->windows.mjs;
  end;
```