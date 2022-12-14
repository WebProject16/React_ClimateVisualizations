# React_ClimateVisualizations

---

## Esittely
React_ClimateVisualizations on web-ohjelmoinnin sovellusprojektimme tuotos. Projekti on toisen lukuvuoden ensimmäinen projekti, joka käsittelee web-ohjelmointia yksinkertaisuudessaan. Projektimme teemana toimivat maailmanlaajuiset lämpötilat, joita sivumme käsittelee eri visualisaatioiden lomassa. Tehtävänä oli ryhmätyönä luoda nettisovellus, joka sisältäisi vuosituhansien varrelta lämpötilapoikkeamia, sekä hiilioksidipäästöjen mittauksia. Sivulle haluttiin luoda perinteiset ominaisuudet, jossa asiakas voi luoda käyttäjän, kirjautua sisään ja mukauttaa sisältöä haluamansa näköiseksi.

### Demo
[Demo](http://5.255.109.11)

### Vastuualueet
Alle listattuna karkeasti mitä kukakin projektin jäsen on tehnyt

Miko Prykäri:
Projektin alussa tein projektin pohjan. Tein käyttäjän luomiseen sivun frontendiin sekä vaadittavat http pyynnöt ja API endpointit, tarkistukset sivulle onko käyttäjä kirjautunut vai ei käyttäen React Contextia, salasanojen ja käyttäjänimien vaatimukset (esim. salasanassa on oltava kirjaimia ja numeroita). Kävin V10:ntä varten datapisteet läpi ja toteutin visualisaatiot v7, v10, v1, v2 sekä viimeistelin v3 ja v4. Tein myös frontendin puolelle testit sisäänkirjautumista sekä rekisteröintiä varten ja käänsin suurimman osan käyttäjälle näytettävästä tekstistä suomeksi. Tein myös huomattavan paljon sivun tyylittelystä Lassen kanssa
 Lisäksi autoin myös muita projekti jäseniä toteuttamaan heille jaetut tehtävät (esim profiili sivu ja käyttäjän poisto toiminnallisuus).
 
Lasse Suomela:
Projektin alussa tein muutamat datasetit ja laitoin datasettejä tietokantaan. Tein backendiin ja frontendiin käyttäjän kirjautumisen sekä backendiin tein JWT:n luomisen ja varmistamisen. Backendiin tein tarkistukset käyttäjän luonnin yhteydessä salasanan vahvuudelle ja käyttäjänimelle. Toteutin visualisaatiot v5, v8, v9 backendiin ja frontendiin sekä korjasin v6 kaavion. Autoin myös Mikoa v1 kaaviossa. Tein backendiin testejä kirjautumiselle ja käyttäjän luonnille. Toteutin käyttäjäkohtaisen näkymän luonnin ja niiden poistamisen backendiin ja frontendiin. Tein tarvittavat muokkaukset tietokantaan, jotta näkymien luominen oli mahdollista. Kirjoitin tyylittelyitä sekä parit mediakyselyt, jotka mahdollistivat käyttäjän tekemien näkymien näkymisen pienemmillä ruuduilla.

Helmi Laakkonen:
Projektin alussa perustin ryhmällemme GitHub organisaation WebProject16, johon luotiin myös sovellusprojektin repositorio React_ClimateVisualizations. Olin myös osana vastuussa sivujen kääntämisessä suomeksi. Olin vastuussa myös frontendin komponenttien luomisesta, yhdessä tiimiläisen Pinjan kanssa. Loin sivumme etusivun, jossa näkyy korteissa visualisaatioiden esinäkymät sekä sopiva otsikko. Etusivulle kirjoitin myös tervetuloa tekstin käyttäjille. Olin vastuussa Profiili sivun tyylittelystä ja asettelusta, sekä lisäsin sinne käyttäjän poistotyökalun. Loin myös tämän Word-dokumentin sekä viimeistelin README-tiedoston.

Pinja Kemppainen:
Ensimmäisiä asioita mitä projektin alussa tein, oli datasettien teko. Projektin kunnolla alkaessa mietittiin ja tehtiin komponentit frontendiin Helmin kanssa. Backendiin loin delete user funktion sekä lisäsin endpointteja v3:sta eteenpäin. Loin ja tein v3 sekä v6 chartit (joista Miko ja Lasse muokkasivat lopulliset versiot myöhemmin). Minulla oli tehtävänä myös v9 chart, jonka tekeminen ei kuitenkaan onnistunut. Lopuksi tein vielä delete userille testaukset sekä front- että backendiin.
Aikaa meni paljon tutkisteluun ja opetteluun, jonka takia työtahti oli hidasta. Ongelmia oli aika paljon ja pienenkin asian tekemiseen saattoi mennä monia tunteja.

---

### Toiminnallisuudet
#### Etusivu
Ensimmäinen näkymä asiakkaalle on etusivu. Etusivulla näkyy visualisaatioiden esikatselut, jossa kaavioiden avulla havainnoidaan lämpötilojen sekä hiilioksidipäästöjen vaihtelua. Visualisaatio-korttia klikkaamalla asiakas voi saada yksityiskohtaista tietoa haluamastaan visualisaatiosta. Etusivulla näkyy myös lyhyt esittely sivun tarkoituksesta ja miten sitä käytetään.

![image](https://user-images.githubusercontent.com/101475167/207713536-e22c67f8-219a-4c7a-b794-f8bcd4095c98.png)
##### FIGURE 1: Lämpötilapoikkeamat vuosittain visualisaatio

#### Kirjautumistoiminnot: rekisteröidy, kirjaudu sisään, profiili.
Asiakkaan täytyy rekisteröityä käyttäjäksi, ennen kuin pääsee haltuun sivun muista ominaisuuksista. Aluksi tulee rekisteröitymisnäkymä, jossa asiakasta pyydetään kirjoittamaan käyttäjänimi ja salasana kahteen kertaan. Rekisteröidyttyä asiakas voi kirjautua aiemmin luodulla käyttäjällään sisään ja luoda omia visualisointeja sivun valikoimasta Profiili-välilehdellä. Profiilivälilehdellä asiakas voi myös poistaa käyttäjänsä, kirjoittamalla käyttäjänimen ja salasanansa uudelleen.

![image](https://user-images.githubusercontent.com/101475167/207713603-1424c8a0-b585-45aa-8191-d6041fbef15c.png)
##### FIGURE 3: Rekisteröimis- näkymä 

![image](https://user-images.githubusercontent.com/101475167/207713635-0f32a22d-ace3-442a-b7cf-468658d11827.png)
##### FIGURE 2: Visualisaatioiden luomistyökalu

---

### Teknologiat ja työohjelmat
Projektimme kehitysympäristönämme toimi Visual Studio Code, jossa käytimme pääohjelmointikielenä JavaScriptiä. Muut ei niin merkitykselliset kielet olivat HTML ja CSS. Nettisivu luotiin Reactilla, joka loi nettisivuja varten näppärän pohjan sivukehittämistä varten. Tietokanta nettisivuille luotiin MySQL:llä, joka importoisi tietoaineistojen sisällöt nettisovellukseemme. Muita tärkeitä teknologioita oli muun muassa Node.js ja Express.js. Versionhallintaan käytettiin GitHub-työympäristöä ja saman palvelun Projects työkalua käytimme tehtävienjakoon.

![image](https://user-images.githubusercontent.com/101475167/207713708-c1e95c82-d020-43d6-9c01-209b29e59b26.png)
FIGURE 4: React_ClimateVisualizations repositorio 12.12.2022

---

## Käyttöönotto
### Ajo-ohjeet
`git clone https://github.com/WebProject16/React_ClimateVisualizations.git` cloonaa repo haluamaasi kansioon
`npm install` projektin, frontend/ sekä backend/-juuressa asentaaksesi tarvittavat riippuvaisuudet

Asenna .env tiedosto

```
HOST=127.0.0.1
USER=root
PASSWORD=super_secret_passsword
DATABASE=db16
PORT=8080
TOKEN=some_secret_password
```


`npm run devRun` backend/-juuressa nodemonia varten

`npm start` frontend/-juuressa reactia varten.

--- 
### Vaihtoehtoisesti voit käynnistää kummatkin samanaikaisest :

`npm run startDev` 

---

### Endpointit
#### Saatavilla olevat päätepisteet, jotka eivät vaadi todennusta

`POST: /user/register` käyttäjänimi, salasana, salasana_rpt

`POST: /user/login` käyttäjänimi, salasana

`GET: /charts/v1`

`GET: /charts/v3`

`GET: /charts/v4`

`GET: /charts/v5`

`GET: /charts/v6`

`GET: /charts/v7`

`GET: /charts/v8`

`GET: /charts/v9`

---

#### Saatavilla olevat päätepisteet, jotka vaativat todennuksen

`DELETE: /user/deleteUser` käyttäjänimi, salasana

`DELETE: /view/:url` poista näkymä

`GET: /user/token`

`GET: /view/users/all` hae käyttäjän nåkymät

`POST: /view/` luo näkymä

---

### Testaaminen

`npm test` frontend/ ja backend/-kansion juuressa testaus skriptin ajamista varten. Testaus skripti aktivoi kussakin kansiossa oman määritellyn komentorivin, jotka ovat

`jest --watchAll --detectOpenHandles` backend/

`react-scripts test --watchAll` frontend/

---


![eer](https://user-images.githubusercontent.com/101475167/207702681-7042a97c-b860-4a6b-96a3-1de2786e1c92.png)
##### FIGURE 5: Tietokantarakenne

*Tekijät: Helmi Laakkonen, Lasse Suomela, Miko Prykäri and Pinja Kemppainen*
