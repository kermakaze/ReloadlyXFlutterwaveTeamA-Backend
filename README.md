
# RedeemFund Api Documentation


**BASE URL** : `https://redeemfund-api.herokuapp.com/api`

#General
# API Authentication

All routes apart from `/login` and `/register` need an authorization header  of Bearer Token set.  
_For example_  

**Authorization** :  `Bearer 1BHAJIDDSKOOOOW`


# Register

Add a beneficiary account

**URL** : `POST /register`

**Request Body** :
```json
{
  
  "name": "string",
  "email": "string",
  "password": "string"
}     
```

## Sample Response


```json
{
  "id": "614378c1ff6d795cb79cb624",
  "accessToken": "eyJhbGciOiJIUzI1......."
}
```

# Log In

Logs you in

**URL** : `POST /login`


**Request Body** :
```json
{
  
  "email": "string",
  "password": "string"
}     
```

## Sample Response


```json
{
  
    
    "id": "5c745de9c3affb0017f24ca8",
    "accessToken": "eyJhbGciOiJIU......"
}
```

