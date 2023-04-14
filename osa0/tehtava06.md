

``` mermaid
    sequenceDiagram
    participant browser
    participant server
    browser->server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    note right of browser: Selain lähettää JSON-muotoisen datan palvelimelle parsittavaksi
    server-->browser: 201 created
    deactivate server
    note right of browser: uusi muistiinpano luodaan - palvelin ei pyydä uudelleenohjausta
    note right of browser: palvelin ei pyydä uudelleenohjausta
```