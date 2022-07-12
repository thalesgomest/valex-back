<p align="center">

<img width=300px src="https://user-images.githubusercontent.com/97575616/178069398-e043df6b-190c-460c-8eb6-3301dd9eb14e.png" >

<h1 align="center">Valex</h1>

</p>


## Technologies
<div>

![uses-node js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-D12228?style=for-the-badge&logo=npm)
![express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![postgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white")
![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white")
![built-with-git](https://img.shields.io/badge/Git-E34F26?style=for-the-badge&logo=git&logoColor=white)
![built-with-vsc](https://img.shields.io/badge/VISUAL%20STUDIO%20CODE-blue?style=for-the-badge&logo=visualstudiocode)

</div>

## Table of contents
* [Project Description](#project-description)
* [Usage](#usage)
* [Author](#author)



## Project Description
<p align="justify">This is a benefit card API. The API is responsible for creating, reloading, activating, as well as processing purchases.
</p>

## Status
<!-- ![status-finished](https://user-images.githubusercontent.com/97575616/152926720-d042178b-24c0-4d6b-94fb-0ccbd3c082cc.svg) -->
![status-in-progress](https://user-images.githubusercontent.com/97575616/153774620-d6a0a615-9d38-4402-ae72-20c52f8bbd5c.svg)

## Usage

```bash
$ git clone https://github.com/thalesgomest/valex-back.git

$ cd valex-back

$ npm install

$ npm run dev
```

API:

```css

POST /card/create
    • Route to create a new card
    • headers: {
		"x-api-key": "adKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0"	
	}
    • body: {
		"employeeId": 2, 
		"cardType": "groceries"
    }
    • response: {
		"number": "4747 7552 7052 6823",
		"cardholderName": "CICLANA M MADEIRA",
		"expirationDate": "07/27",
		"securityCode": "398"
    }

```
⚠️ __*Use the response data of the route /card/create for test the below endpoints*__

```css

PUT /card/activate
    • Route to active a card
    • body: {
		"number": "9877 8641 4181 0418",
		"cardholderName": "CICLANA M MADEIRA",
		"expirationDate": "07/27",
		"securityCode": "761",
		"password": "0402" 
    }
```
```css

PUT /card/block
    • Route to block a card
    • body: {
		"number": "9877 8641 4181 0418",
		"cardholderName": "CICLANA M MADEIRA",
		"expirationDate": "07/27",
		"password": "0402" 
    }
```
```css

PUT /card/unblock
    • Route to unblock a card
    • body: {
		"number": "9877 8641 4181 0418",
		"cardholderName": "CICLANA M MADEIRA",
		"expirationDate": "07/27",
		"password": "0402" 
    }
```

```css

GET /card/statement
    • Route to get card's statement
    • body: {
		"number": "9877 8641 4181 0418",
		"cardholderName": "CICLANA M MADEIRA",
		"expirationDate": "07/27"
    }
	
```
```css

POST /card/recharge
    • Route to get do a card recharge
	• headers: {
		"x-api-key": "adKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0"	
	}
    • body: {
		"number": "9877 8641 4181 0418",
		"cardholderName": "CICLANA M MADEIRA",
		"expirationDate": "07/27",
		"amount": 1500.99
    }
	
```
```css

POST /card/payment/:businessId
	
    • Route to do a payment with a card in a POS (Point of Sale)
    • body: {
		"number": "9877 8641 4181 0418",
		"cardholderName": "CICLANA M MADEIRA",
		"expirationDate": "07/27",
		"password": "0402",
		"amount": 1499.99
    }
	
```

### Author
---
<div align="center">
<img width= 200px src="https://user-images.githubusercontent.com/97575616/157583676-812b2612-a644-4c18-be9c-61f633406f50.png" alt=""/>
  <p> <i><b>Thales Gomes Targino</i></b> </p>

<br /> [![Twitter Badge](https://img.shields.io/badge/-@thales_targino-1ca0f1?style=flat-square&labelColor=1ca0f1&logo=twitter&logoColor=white&link=https://twitter.com/thales_targino)](https://twitter.com/thales_targino) [![Linkedin Badge](https://img.shields.io/badge/-thalesgomest-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/thales-gomes-targino/)](https://www.linkedin.com/in/thales-gomes-targino/) 
[![Gmail Badge](https://img.shields.io/badge/-thalestargino@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:thalestargino@gmail.com)](mailto:thalestargino@gmail.com)
  
</div>

 
