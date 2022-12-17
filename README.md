# Projektas „Blood tests“

# Sprendžiamo uždavinio aprašymas

## Sistemos paskirtis

Projekto tikslas – padėti žmogui sekti savo ir artimųjų sveikatą, remiantis kraujo tyrimais. Žmogus, norėdamas naudotis šia platforma, turės prisiregistruoti prie internetinės aplikacijos. Prisiregistravęs vartotojas galės įvedinėti ir stebėti kraujo tyrimų duomenis, sekti sveikatos parametrų pokyčius.

## Funkciniai reikalavimai

Neregistruotas sistemos vartotojas galės:

- Peržiūrėti platformos reprezentacinį puslapį;
- Peržiūrėti platformos aprašymo puslapį;
- Peržiūrėti straipsnius;
- Prisiregistruoti prie internetinės aplikacijos.

Registruotas sistemos vartotojas galės:

- Sveikatos kortelių CRUD;
- Kraujo tyrimų CRUD;
- Kraujo tyrimo analičių CRUD.

Administratorius galės:

- Redaktorių CRUD.

Redaktorius galės:

- Straipsnių CRUD.

Prisijungę vartotojai taip pat gali:

- Atsijungti;
- Atlikti visas neregistruoto vartotojo funkcijas.

# Pasirinktų technologijų aprašymas

- Kliento pusė (angl. Front-End) – React karkasas;
- Dizainas - Material UI biblioteka;
- Serverio pusė (angl. Back-End) – Express.js karkasas;
- Duomenų bazė – MySQL;
- ORM - Prisma ORM.

# Sistemos architektūra

Sistemos diegimo diagrama

![Sistemos diegimo diagrama](images/sdd.png)

# Naudotojo sąsajos projektas

## Pagrindinis puslapis

Eskizas
![Pagrindinio puslapio eskizas](images/wireframes/homewf.png)
Relizacija
![Pagrindinis puslapis](images/screenshots/home.png)

## Apie mus puslapis

Eskizas
![Apie mus puslapio eskizas](images/wireframes/aboutwf.png)
Relizacija
![Apie mus puslapis](images/screenshots/about.png)

## Prisijungimo / Registracijos puslapiai

Eskizas
![Prisijungimo / Registracijos eskizas](images/wireframes/loginwf.png)
Relizacijos
![Prisijungimo puslapis](images/screenshots/signin.png)
![Registracijos puslapis](images/screenshots/signup.png)

## Funkciniai puslapiai

Eskizas
![Funkcinio puslapio eskizas](images/wireframes/dashboardwf.png)
Relizacijos
![Kortelių puslapis](images/screenshots/medicalcards.png)
![Testų puslapis](images/screenshots/bloodtests.png)
![Analičių puslapis](images/screenshots/bloodtestanalytes.png)
![Redaktorių puslapis](images/screenshots/editors.png)
![Postų puslapis](images/screenshots/posts.png)

## Funkciniai modalai

Eskizas
![Funkcinio modalo eskizas](images/wireframes/modalwf.png)
Relizacijos
![Pridėjimo modalo eskizas](images/screenshots/add.png)
![Ištrinti modalo eskizas](images/screenshots/delete.png)
![Redagavimo modalo eskizas](images/screenshots/edit.png)

## Posto pridėjimo / redagavimo puslapiai

Eskizas
![Posto pridėjimo / redagavimo eskizas](images/wireframes/postaddwf.png)
Relizacijos
![Posto pridėjimo eskizas](images/screenshots/addpost.png)
![Posto redagavimo eskizas](images/screenshots/editpost.png)

# API specifikacija

## Medical Cards

## Get medical cards

### Request

GET /medical-cards

### Information

|                         |                    |
| ----------------------- | ------------------ |
| Response formats        | JSON               |
| Requires authentication | Yes                |
| Possible responses      | 200, 401, 403, 500 |

### Parameters

| Parameter | Required | Description                      | Default value | Example |
| --------- | -------- | -------------------------------- | ------------- | ------- |
| page      | optional | Page of list of data             | 1             | 2       |
| count     | optional | Number of records to be returned | 50            | 10      |

### Example request

GET /medical-cards?page=1&count=2

### Example response

```
[
    {
        "id": 1,
        "name": "Name1",
        "surname": "Surname1",
        "genderId": 1,
        "birthDate": "2000-01-01T00:00:00.000Z",
        "userId": 1
    },
    {
        "id": 2,
        "name": "Name2",
        "surname": "Surname2",
        "genderId": 2,
        "birthDate": "2000-01-01T00:00:00.000Z",
        "userId": 1
    }
]
```

## Post medical card

### Request

POST /medical-cards

### Information

|                         |                         |
| ----------------------- | ----------------------- |
| Response formats        | JSON                    |
| Requires authentication | Yes                     |
| Possible responses      | 201, 400, 401, 403, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

POST /medical-cards

```
{
    "name": "Name",
    "surname": "Surname",
    "genderId": 1,
    "birthDate": "2000-01-01T00:00:00.000Z"
}
```

### Example response

```
{
    "id": 19,
    "name": "Name",
    "surname": "Surname",
    "genderId": 1,
    "birthDate": "2000-01-01T00:00:00.000Z",
    "userId": 1
}
```

## Get medical card

### Request

GET /medical-cards/:medicalCardId

### Information

|                         |                         |
| ----------------------- | ----------------------- |
| Response formats        | JSON                    |
| Requires authentication | Yes                     |
| Possible responses      | 200, 401, 403, 404, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

GET /medical-cards/1

### Example response

```
{
    "id": 1,
    "name": "Name",
    "surname": "Surname",
    "genderId": 1,
    "birthDate": "2000-01-01T00:00:00.000Z",
    "userId": 1
}
```

## Update medical card

### Request

PUT /medical-cards/:medicalCardId

### Information

|                         |                              |
| ----------------------- | ---------------------------- |
| Response formats        | JSON                         |
| Requires authentication | Yes                          |
| Possible responses      | 200, 400, 401, 403, 404, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

PUT /medical-cards/1

```
{
    "name": "Name",
    "surname": "Surname",
    "genderId": 1,
    "birthDate": "2000-01-01T00:00:00.000Z"
}
```

### Example response

```
{
    "id": 1,
    "name": "Name",
    "surname": "Surname",
    "genderId": 1,
    "birthDate": "2000-01-01T00:00:00.000Z",
    "userId": 1
}
```

## Delete medical card

### Request

DELETE /medical-cards/:medicalCardId

### Information

|                         |                         |
| ----------------------- | ----------------------- |
| Response formats        | JSON                    |
| Requires authentication | Yes                     |
| Possible responses      | 204, 401, 403, 404, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

DELETE /medical-cards/1

### Example response

Status: 204 No Content

## Blood tests

## Get blood tests

### Request

GET /medical-cards/:medicalCardId/blood-tests

### Information

|                         |                    |
| ----------------------- | ------------------ |
| Response formats        | JSON               |
| Requires authentication | Yes                |
| Possible responses      | 200, 401, 403, 500 |

### Parameters

| Parameter | Required | Description                      | Default value | Example |
| --------- | -------- | -------------------------------- | ------------- | ------- |
| page      | optional | Page of list of data             | 1             | 2       |
| count     | optional | Number of records to be returned | 50            | 10      |

### Example request

GET /medical-cards/1/blood-tests?page=1&count=2

### Example response

```
[
    {
        "id": 1,
        "date": "2022-12-01T00:00:00.000Z",
        "medicalCardId": 1
    },
    {
        "id": 2,
        "date": "2022-11-01T00:00:00.000Z",
        "medicalCardId": 1
    }
]
```

## Post blood test

### Request

POST /medical-cards/:medicalCardId/blood-tests

### Information

|                         |                         |
| ----------------------- | ----------------------- |
| Response formats        | JSON                    |
| Requires authentication | Yes                     |
| Possible responses      | 201, 400, 401, 403, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

POST /medical-cards/1/blood-tests

```
{
    "date": "2022-10-01T00:00:00.000Z",
}
```

### Example response

```
{
    "id": 1,
    "date": "2022-10-01T00:00:00.000Z",
    "medicalCardId": 1
}
```

## Get blood test

### Request

GET /medical-cards/:medicalCardId/blood-tests/:bloodTestId

### Information

|                         |                         |
| ----------------------- | ----------------------- |
| Response formats        | JSON                    |
| Requires authentication | Yes                     |
| Possible responses      | 200, 401, 403, 404, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

GET /medical-cards/1/blood-tests/1

### Example response

```
{
    "id": 1,
    "date": "2022-10-01T00:00:00.000Z",
    "medicalCardId": 1
}
```

## Update blood test

### Request

PUT /medical-cards/:medicalCardId/blood-tests/:bloodTestId

### Information

|                         |                              |
| ----------------------- | ---------------------------- |
| Response formats        | JSON                         |
| Requires authentication | Yes                          |
| Possible responses      | 200, 400, 401, 403, 404, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

PUT /medical-cards/1/blood-tests/1

```
{
    "date": "2022-10-01T00:00:00.000Z"
}
```

### Example response

```
{
    "id": 1,
    "date": "2022-10-01T00:00:00.000Z",
    "medicalCardId": 1
}
```

## Delete blood test

### Request

DELETE /medical-cards/:medicalCardId/blood-tests/:bloodTestId

### Information

|                         |                         |
| ----------------------- | ----------------------- |
| Response formats        | JSON                    |
| Requires authentication | Yes                     |
| Possible responses      | 204, 401, 403, 404, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

DELETE /medical-cards/1/blood-tests/1

### Example response

Status: 204 No Content

## Blood test analytes

## Get blood test analytes

### Request

GET /medical-cards/:medicalCardId/blood-tests/:bloodTestId/blood-test-analytes

### Information

|                         |                    |
| ----------------------- | ------------------ |
| Response formats        | JSON               |
| Requires authentication | Yes                |
| Possible responses      | 200, 401, 403, 500 |

### Parameters

| Parameter | Required | Description                      | Default value | Example |
| --------- | -------- | -------------------------------- | ------------- | ------- |
| page      | optional | Page of list of data             | 1             | 2       |
| count     | optional | Number of records to be returned | 50            | 10      |

### Example request

GET /medical-cards/1/blood-tests/1/blood-test-analytes?page=1&count=3

### Example response

```
[
    {
        "id": 1,
        "value": 10,
        "bloodTestId": 1,
        "bloodTestAnalyteDescriptionId": 1
    },
    {
        "id": 2,
        "value": 20,
        "bloodTestId": 1,
        "bloodTestAnalyteDescriptionId": 2
    },
    {
        "id": 3,
        "value": 30,
        "bloodTestId": 1,
        "bloodTestAnalyteDescriptionId": 3
    }
]
```

## Post blood test analyte

### Request

POST /medical-cards/:medicalCardId/blood-tests/1/blood-test-analytes

### Information

|                         |                         |
| ----------------------- | ----------------------- |
| Response formats        | JSON                    |
| Requires authentication | Yes                     |
| Possible responses      | 201, 400, 401, 403, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

POST /medical-cards/1/blood-tests/1/blood-test-analytes

```
{
    "value": 10,
    "bloodTestAnalyteDescriptionId": 1
}
```

### Example response

```
{
    "id": 1,
    "value": 10,
    "bloodTestId": 1,
    "bloodTestAnalyteDescriptionId": 1
}
```

## Get blood test analyte

### Request

GET /medical-cards/:medicalCardId/blood-tests/:bloodTestId/blood-test-analytes/:bloodTestAnalyteId

### Information

|                         |                         |
| ----------------------- | ----------------------- |
| Response formats        | JSON                    |
| Requires authentication | Yes                     |
| Possible responses      | 200, 401, 403, 404, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

GET /medical-cards/1/blood-tests/1/blood-test-analytes/1

### Example response

```
{
    "id": 1,
    "value": 10,
    "bloodTestId": 1,
    "bloodTestAnalyteDescriptionId": 1
}
```

## Update blood test analyte

### Request

PUT /medical-cards/:medicalCardId/blood-tests/:bloodTestId/blood-test-analytes/:bloodTestAnalyteId

### Information

|                         |                              |
| ----------------------- | ---------------------------- |
| Response formats        | JSON                         |
| Requires authentication | Yes                          |
| Possible responses      | 200, 400, 401, 403, 404, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

PUT /medical-cards/1/blood-tests/1/blood-test-analytes/1

```
{
    "value": 10,
    "bloodTestAnalyteDescriptionId": 1
}
```

### Example response

```
{
    "id": 1,
    "value": 10,
    "bloodTestId": 1,
    "bloodTestAnalyteDescriptionId": 1
}
```

## Delete blood test analyte

### Request

DELETE /medical-cards/:medicalCardId/blood-tests/:bloodTestId/blood-test-analytes/:bloodTestAnalyteId

### Information

|                         |                         |
| ----------------------- | ----------------------- |
| Response formats        | JSON                    |
| Requires authentication | Yes                     |
| Possible responses      | 204, 401, 403, 404, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

DELETE /medical-cards/1/blood-tests/1/blood-test-analytes/1

### Example response

Status: 204 No Content

## Posts

## Get posts

### Request

GET /posts

### Information

|                         |                    |
| ----------------------- | ------------------ |
| Response formats        | JSON               |
| Requires authentication | No                 |
| Possible responses      | 200, 401, 403, 500 |

### Parameters

| Parameter | Required | Description                      | Default value | Example |
| --------- | -------- | -------------------------------- | ------------- | ------- |
| page      | optional | Page of list of data             | 1             | 2       |
| count     | optional | Number of records to be returned | 50            | 10      |

### Example request

GET /posts?page=1&count=2

### Example response

```
[
    {
        "id": 1,
        "title": "Title1",
        "description": "Description1",
        "date": "2022-01-01T00:00:00.000Z",
        "content": "Content1",
        "editorId": 1,
        "lastEditorId": 1,
        "lastEditedDate": "2022-01-01T00:00:00.000Z"
    },
    {
        "id": 2,
        "title": "Title2",
        "description": "Description2",
        "date": "2022-01-01T00:00:00.000Z",
        "content": "Content2",
        "editorId": 2,
        "lastEditorId": 2,
        "lastEditedDate": "2022-01-01T00:00:00.000Z"
    }
]
```

## Post post

### Request

POST /posts

### Information

|                         |                         |
| ----------------------- | ----------------------- |
| Response formats        | JSON                    |
| Requires authentication | Yes                     |
| Possible responses      | 201, 400, 401, 403, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

POST /posts

```
{
    "title": "Title1",
    "description": "Description1,
    "content": "Content1"
}
```

### Example response

```
{
    "id": 1,
    "title": "Title1",
    "description": "Description1",
    "date": "2022-01-01T00:00:00.000Z",
    "content": "Content1",
    "editorId": 1,
    "lastEditorId": 1,
    "lastEditedDate": "2022-01-01T00:00:00.000Z"
}
```

## Get post

### Request

GET /posts/:postId

### Information

|                         |                         |
| ----------------------- | ----------------------- |
| Response formats        | JSON                    |
| Requires authentication | No                      |
| Possible responses      | 200, 401, 403, 404, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

GET /posts/1

### Example response

```
{
    "id": 1,
    "title": "Title1",
    "description": "Description1",
    "date": "2022-01-01T00:00:00.000Z",
    "content": "Content1",
    "editorId": 1,
    "lastEditorId": 1,
    "lastEditedDate": "2022-01-01T00:00:00.000Z"
}
```

## Update post

### Request

PUT /posts/:postId

### Information

|                         |                              |
| ----------------------- | ---------------------------- |
| Response formats        | JSON                         |
| Requires authentication | Yes                          |
| Possible responses      | 200, 400, 401, 403, 404, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

PUT /posts/1

```
{
    "title": "Title1",
    "description": "Description1,
    "content": "Content1"
}
```

### Example response

```
{
    "id": 1,
    "title": "Title1",
    "description": "Description1",
    "date": "2022-01-01T00:00:00.000Z",
    "content": "Content1",
    "editorId": 1,
    "lastEditorId": 1,
    "lastEditedDate": "2022-01-01T00:00:00.000Z"
}
```

## Delete post

### Request

DELETE /posts/:postId

### Information

|                         |                         |
| ----------------------- | ----------------------- |
| Response formats        | JSON                    |
| Requires authentication | Yes                     |
| Possible responses      | 204, 401, 403, 404, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

DELETE /posts/1

### Example response

Status: 204 No Content

## Editors

## Get editors

### Request

GET /editors

### Information

|                         |                    |
| ----------------------- | ------------------ |
| Response formats        | JSON               |
| Requires authentication | Yes                |
| Possible responses      | 200, 401, 403, 500 |

### Parameters

| Parameter | Required | Description                      | Default value | Example |
| --------- | -------- | -------------------------------- | ------------- | ------- |
| page      | optional | Page of list of data             | 1             | 2       |
| count     | optional | Number of records to be returned | 50            | 10      |

### Example request

GET /posts?page=1&count=2

### Example response

```
[
    {
        "id": 1,
        "email": "editor1@gmail.com",
        "role": "EDITOR"
    },
    {
        "id": 2,
        "email": "editor2@gmail.com",
        "role": "EDITOR"
    }
]
```

## Post editor

### Request

POST /posts

### Information

|                         |                         |
| ----------------------- | ----------------------- |
| Response formats        | JSON                    |
| Requires authentication | Yes                     |
| Possible responses      | 201, 400, 401, 403, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

POST /posts

```
{
    "email": "editor1@gmail.com",
    "password": "Password1#,
}
```

### Example response

```
{
    "email": "editor1@gmail.com",
}
```

## Delete editor

### Request

DELETE /editors/:editorId

### Information

|                         |                         |
| ----------------------- | ----------------------- |
| Response formats        | JSON                    |
| Requires authentication | Yes                     |
| Possible responses      | 204, 401, 403, 404, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

DELETE /editor/1

### Example response

Status: 204 No Content

## User

## Get my info

### Request

GET /user/me

### Information

|                         |                         |
| ----------------------- | ----------------------- |
| Response formats        | JSON                    |
| Requires authentication | Yes                     |
| Possible responses      | 200, 401, 403, 404, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

GET /user/me

### Example response

```
{
    "id": 1,
    "email": "user1@gmail.com",
    "role": "USER"
}
```

## Authentication

## Sign In

### Request

POST /signin

### Information

|                         |               |
| ----------------------- | ------------- |
| Response formats        | JSON          |
| Requires authentication | No            |
| Possible responses      | 200, 403, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

POST /signin

```
{
    "email": "user1@gmail.com",
    "password": "Password1#,
}
```

### Example response

```
{
    "user": {
        "id": 1,
        "email": "user1@gmail.com",
        "role": "USER"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyMUBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY3MTI4Mjc2OSwiZXhwIjoxNjcxMjgzNjY5fQ.xqYKPapT-BMFhFYfeZYp7Mrb1gcrFkcYlW_MDFvqYLg"
}
```

## Sign Up

### Request

POST /signup

### Information

|                         |               |
| ----------------------- | ------------- |
| Response formats        | JSON          |
| Requires authentication | No            |
| Possible responses      | 200, 400, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

POST /signup

```
{
    "email": "user1@gmail.com",
    "password": "Password1#,
}
```

### Example response

```
{
    "email": "user1@gmail.com"
}
```

## Enums

## Get genders

### Request

GET /genders

### Information

|                         |               |
| ----------------------- | ------------- |
| Response formats        | JSON          |
| Requires authentication | No            |
| Possible responses      | 200, 404, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

GET /genders

### Example response

```
[
    {
        "id": 1,
        "name": "Male"
    },
    {
        "id": 2,
        "name": "Female"
    }
]
```

## Get blood test analyte descriptions

### Request

GET /blood-test-analyte-descriptions

### Information

|                         |               |
| ----------------------- | ------------- |
| Response formats        | JSON          |
| Requires authentication | No            |
| Possible responses      | 200, 404, 500 |

### Parameters

| Parameter | Required | Description | Default value | Example |
| --------- | -------- | ----------- | ------------- | ------- |

### Example request

GET /blood-test-analyte-descriptions

### Example response

```
[
    {
        "id": 1,
        "name": "Potasium",
        "abbreviation": "K",
        "unit": "mmol/L"
    },
    {
        "id": 2,
        "name": "Sodium",
        "abbreviation": "Na",
        "unit": "mmol/L"
    },
    {
        "id": 3,
        "name": "Magnesium",
        "abbreviation": "Mg",
        "unit": "mmol/L"
    }
]
```

# Projekto išvados

- Visi projekto uždaviniai sėkmingai įgyvendinti.
- Pagilintos arba naujai įgytos žinios vartotojo sąsajos kūrime (angl. frontend), API kūrime, duomenų bazės projektavime ir kūrime, bei programos diegime debesijoje.
- Įgyvendintas projektas leidžia išsaugoti savo ir savo artimųjų kraujo tyrimų rezultatus.
