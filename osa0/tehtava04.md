
``` mermaid
    sequenceDiagram
        participant browser
        participant server

        browser->server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
        activate server

        Note right of browser: selain lähettää syötteenä annetun datan serverille

        server-->browser: uudelleenohjauspyyntö
        deactivate server

        Note right of browser: palvelin kehottaa selainta tekemään automaattisesti uuden HTTP GET -pyynnön paikkaan /exampleapp/notes

        Note right of browser: selain lataa uudelleen muistiinpanojen sivun, sekä tyylitiedoston, JavaScript-koodin ja muistiinpanojen raakadatan
        
```
