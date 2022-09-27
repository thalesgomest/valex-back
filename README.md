<img width=100% src="https://user-images.githubusercontent.com/97575616/192410656-7a0812ab-0194-4c3b-aec6-506f04cbb406.png" >

## 📑 Contents

-   [Project Description](#-project-description)
-   [Status of work](#-status-of-work)
-   [How to run](#%EF%B8%8F-how-to-run)
-   [API Documentation](#📮-api-documentation)
-   [Build with](#%EF%B8%8F-build-with)
-   [Contact](#-contact)

## 📌 Project Description

<p align="justify">This is a benefit card API. The API is responsible for creating, reloading, activating, as well as processing all purchases of the card.
</p>

## 🚧 Status of work

![status](https://img.shields.io/badge/Status-Finished-00920F?style=plastic)<br>

<!-- ![status](https://img.shields.io/badge/Status-Progress-FFE70C?style=plastic) -->

## ⚙️ How to run

```bash
# Clone this repoository
$ git clone https://github.com/thalesgomest/valex-back.git

# Change to project directory
$ cd valex-back

# Install all dependencies
$ npm install

# Run the project with
$ npm run dev
```

## 📮 API Documentation

Route to create a new card

```http
POST /card/create
```

####

| Headers     | Type     | Description                             |
| :---------- | :------- | :-------------------------------------- |
| `x-api-key` | `string` | adKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0 |

| Body         | Type     | Description                     |
| :----------- | :------- | :------------------------------ |
| `employeeId` | `number` | **Required** → employee Id      |
| `cardType`   | `enum`   | **Required** → Transaction Type |

| TransactionTypes |
| ---------------- |
| groceries        |
| restaurant       |
| transport        |
| education        |
| health           |

#### Response:

```json
{
	"number": "4747 7552 7052 6823",
	"cardholderName": "CICLANA M MADEIRA",
	"expirationDate": "07/27",
	"securityCode": "398"
}
```

❗ Use the response data of the route /card/create for test the below endpoints ⤵️

##

Route to active a card

```http
POST /card/create
```

| Body             | Type     | Description                         |
| :--------------- | :------- | :---------------------------------- |
| `number`         | `string` | **Required**. → card number         |
| `cardholderName` | `string` | **Required** → cardholder name      |
| `expirationDate` | `string` | **Required** → card expiration date |
| `securityCode`   | `string` | **Required** → card securityCode    |
| `password`       | `string` | **Required** → card password        |

##

Route to block a card

```http
PUT /card/block
```

| Body             | Type     | Description                         |
| :--------------- | :------- | :---------------------------------- |
| `number`         | `string` | **Required**. → card number         |
| `cardholderName` | `string` | **Required** → cardholder name      |
| `expirationDate` | `string` | **Required** → card expiration date |
| `password`       | `string` | **Required** → card password        |

##

Route to unblock a card

```http
PUT /card/unblock
```

| Body             | Type     | Description                         |
| :--------------- | :------- | :---------------------------------- |
| `number`         | `string` | **Required**. → card number         |
| `cardholderName` | `string` | **Required** → cardholder name      |
| `expirationDate` | `string` | **Required** → card expiration date |
| `password`       | `string` | **Required** → card password        |

##

Route to get card's statement

```http
GET /card/statement
```

| Body             | Type     | Description                         |
| :--------------- | :------- | :---------------------------------- |
| `number`         | `string` | **Required**. → card number         |
| `cardholderName` | `string` | **Required** → cardholder name      |
| `expirationDate` | `string` | **Required** → card expiration date |

##

Route to get do a card recharge

```http
POST /card/recharge
```

| Headers     | Type     | Description                             |
| :---------- | :------- | :-------------------------------------- |
| `x-api-key` | `string` | adKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0 |

| Body             | Type     | Description                         |
| :--------------- | :------- | :---------------------------------- |
| `number`         | `string` | **Required**. → card number         |
| `cardholderName` | `string` | **Required** → cardholder name      |
| `expirationDate` | `string` | **Required** → card expiration date |
| `amount`         | `number` | **Required** → recharge amount      |

##

Route to do a payment with a card in a POS (Point of Sale)

```http
POST /card/payment/:businessId
```

| Body             | Type     | Description                         |
| :--------------- | :------- | :---------------------------------- |
| `number`         | `string` | **Required**. → card number         |
| `cardholderName` | `string` | **Required** → cardholder name      |
| `expirationDate` | `string` | **Required** → card expiration date |
| `password`       | `string` | **Required** → card password        |
| `amount`         | `number` | **Required** → payment amount       |

##

## 🛠️ Build with

![uses-node js](https://img.shields.io/badge/Node.js-43853D?style=plastic&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-D12228?style=plastic&logo=npm)
![express](https://img.shields.io/badge/Express-000000?style=plastic&logo=express&logoColor=white)
![postgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=plastic&logo=postgresql&logoColor=white)
![heroku](https://img.shields.io/badge/Heroku-430098?style=plastic&logo=heroku&logoColor=white")
![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=plastic&logo=typescript&logoColor=white")
![built-with-git](https://img.shields.io/badge/Git-E34F26?style=plastic&logo=git&logoColor=white)
![built-with-vsc](https://img.shields.io/badge/Visual%20Studio%20Code-blue?style=plastic&logo=visualstudiocode)

## 📫 Contact

<a href = "mailto:thalestargino@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=plastic&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/thalesgomest/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=plastic&logo=linkedin&logoColor=white" target="_blank"></a>
