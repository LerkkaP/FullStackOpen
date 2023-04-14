
``` mermaid
    sequenceDiagram
    participant browser
    participant server
    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->browser: HTML dokumentti
    deactivate server
    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->browser: css tiedosto
    deactivate server
    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->browser: javascript tiedosto
    deactivate server
    note right of browser: JavaScript koodi ajetaan ja data pyydetään 
    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->browser: JSON data
    deactivate server
    note right of browser: JavaScript koodi lisää sivulle muistiinpanoja edustavat HTML-elementit DOM-apia hyödyntäen
```
