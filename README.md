
# Full-stack-app

    Projekti, jonka tarkoitus on havainnollistaa kokemusta työskentelystä
    erilaisten tekniikoiden ja toiminnallisuuksien parissa.
    
    Projekti havainnollistaa logistiikka-alan yrityksen kuljetusten seurantaan tarkoitettua sovellusta.

    Projektissa käytettäviä teknologioita: 
        - React&Vite frontendissä.
        - MongoDB, node, express backendissä.

    Projektin käynnistys:
        - root kansiossa /full-stack-app, docker compose up
        - /backend sekä /frontend kansioissa, npm run dev

# Backend

    Backend kansioon on toteutettu mongodb-tietokanta sekä API-pyynnöt. Tiedostot on jaettu src/ kansiossa:
        - db, sisältää mongoosen käyttöönoton.
        - middleware, sisältää autentikoinnin tarkistuksen, sekä tapauskohtaisen oikeuksien tarkistuksen tietyssä tilanteessa.
        - models, sisältää mallit käytettäville tietotyypeille.
        - routers, sisältää tietotyyppien mahdolliset api-kutsut.
        - index.js, ajetaan käynnistettäessä, käynnistää palvelinsovelluksen Expressillä, sekä määrittää tarvittavat riippuvuudet ja reitit.

# Frontend

    Frontend toteutettu reactilla ja typescriptillä.
        - kirjautumistoiminto toteutettu onnistuneesti
        - kirjauduttaessa, jwt lähetetään autentikointia varten
        - oikeutettu käyttäjä pääsee käsiksi sivun toimintoihin
        - drivers sivu onnistuneesti hakee kuljettajat tietokannasta ja listaa ne

# Projekti tässä vaiheessa
    Tietokannan ensimmäinen admin pitää lisätä manuaalisesti tai alustustiedostossa. Manuaalinen lisääminen vaatii,
    että /backend/src/routers/user.js -tiedostossa otetaan kommentointi pois post('/api/user') reitistä. Tällä hetkellä backendin
    suojaamaton post reitti mahdollistaa ensimmäisen käyttäjän luomisen, jonka jälkeen voidaan turvautua suojattuihin 
    reitteihin kirjautumisen jälkeen ja kun token on lisätty kutsuun.       -- TYÖN ALLA! --

    Kuljettajan lisäämiseksi tälle täytyy ensin luoda käyttäjä, johon voidaan viitata kuljettajan luonnin yhteydessä.

    Tällä hetkellä onnistuneesti luodut kuljettajat pystyy drivers -sivulla onnistuneesti hakemaan ja ne tulostetaan sivulle.

    Tietokantaan tallennetaan hashattu salasana sekä tokenit.

    MUISTA: .env -tiedostossa pitää olla määritelty JWT_SECRET.


# Kehityspäiväkirja

17.7.2024
    Projekti aloitettu ja pushattu Gitiin.

    Tehty dockerin tietokantaan komennot.js mukaiset "collections",
    jotka noudattavat ja vaativat tietyntyyppistä rakennetta (skeemaa) dokumenteilta.
    Lisätty collectionit: customer, driver, drivingSession, vehicle.
    Dokumentteja ei vielä lisätty.

26.9.2024
    muokattu kansioiden rakenne vastaamaan paremmin sovelluksen tulevaa rakennetta.

    Alustettu node-projekti ja listätty riippuvuuksia sovellukseen: nodemon, express, mongoose.
    Päätetty luopua komennot.js-rakenteesta, korvataan mongoose:lla.
    Luotu frontend & backend kansiot, jotka alustettu node-projektiksi, sekä react&vite projektiksi.

27.9.2024
    Korjattu ja päivitetty projektin rakennetta.

    Muokattu tiedostoja, jotka kuuluvat .gitignoreen, lisätty package.json roottiin, 
    josta voidaan käynnistää kerralla molemmat projektit.
    Saatiin frontendin ja backendin välinen yhteys toimimaan.

29.9.2024
    Alettu määrittämään tietotyyppien rakenteita.

    Muokattu models-tiedostojen rakennetta vastaamaan paremmin tarpeita ja luotu uusia malleja.
    Lisätty company-malli, journey-malli, vehicle-malli, driver-malli.
    Company toimii myös omalle yritykselle. Ajoneuvot kuuluvat yritykselle. journeyllä on linkatut
    kuljettaja ja ajoneuvo.

12.10.2024
    Kehitetty API:n reittejä

    Lisätty CRUD-toiminnot driver- sekä company reittiin.

13.10.2024
    Jatkettu API:n reittien kehittämistä ja testausta.

    Luotu vehicle reitit ja tehty ajoneuvon luonti niin, että ajoneuvon 
    post-metodi kutsuu viitatun companyn patch-metodia lisäten ajoneuvon id:n companyn ajoneuvo taulukkoon.
    Lisätty loput reitit ja korjattu routers toimintaa yhdessä models kanssa.
    Luodessa uuden tietojäsenen onnistuneesti lisätään viittaaviin tietojäseniin tunniste (id).

9.11.2024
    Kehitetty fronend-puolta; implementoitu React-Router, luotu sivuja ja komponentteja, sekä tehty yhtenäinen navigointi sivuille.

8.1.2024
    Dockerin localnet piti luoda laitekohtaisesti manuaalisesti uudelleen, jotta docker toimisi.
    - docker network create localnet


-- END OF FILE --

