# Projektas „Sveikata“

# Sprendžiamo uždavinio aprašymas

## Sistemos paskirtis

Projekto tikslas – padėti žmogui sekti savo ir artimųjų sveikatą, remiantis kraujo tyrimais. Veikimo principas – platformą sudaro dvi dalys: internetinė aplikacija, kuria naudosis vartotojai, administratorius bei aplikacijų programavimo sąsaja (angl. trump. API). Žmogus, norėdamas naudotis šia platforma, turės prisiregistruoti prie internetinės aplikacijos. Prisiregistravęs vartotojas galės įvedinėti ir stebėti kraujo tyrimų duomenis, sekti savo ir artimųjų sveikatos parametrų pokyčius.

## Funkciniai reikalavimai

Neregistruotas sistemos vartotojas galės:

- Peržiūrėti platformos reprezentacinį puslapį;
- Prisiregistruoti prie internetinės aplikacijos.

Registruotas sistemos vartotojas galės:

- Prisijungti prie platformos;
- Atsijungti nuo internetinės aplikacijos;
- Pridėti sveikatos kortelę;
- Priskirti kraujo tyrimą sveikatos kortelei;
- Priskirti kraujo tyrimui analitę.

Administratorius galės:

- Pašalinti vartotojo paskyrą.

# Pasirinktų technologijų aprašymas

- Kliento pusė (angl. Front-End) – SvelteKit karkasas;
- Serverio pusė (angl. Back-End) – Express.js karkasas;
- Duomenų bazė – MySQL;
- Stilius - Tailwind CSS karkasas;
- ORM - Prisma ORM.

# Sistemos architektūra

Sistemos diegimo diagrama

![Sistemos diegimo diagrama](images/sdd.png)
