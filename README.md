
# Full-stack-app

    Projekti, jonka tarkoitus on havainnollistaa kokemusta työskentelystä
    erilaisten tekniikoiden ja toiminnallisuuksien parissa.

    Projekti havainnollistaa logistiikka-alan yrityksen kuljetusten seurantaan tarkoitettua sovellusta.

# Backend

    Backend kansioon on toteutettu mongodb-tietokanta sekä API-pyynnöt. Tiedostot on jaettu src/ kansiossa:
        - db, sisältää mongoosen käyttöönoton.
        - middleware, sisältää autentikoinnin tarkistuksen, sekä tapauskohtaisen oikeuksien tarkistuksen tietyssä tilanteessa.
        - models, sisältää mallit käytettäville tietotyypeille.
        - routers, sisältää tietotyyppien mahdolliset api-kutsut.
        - index.js, ajetaan käynnistettäessä, käynnistää palvelinsovelluksen Expressillä, sekä määrittää tarvittavat riippuvuudet ja reitit.

# Frontend

    Tulossa