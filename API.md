# Backend Server

## Authorization
Auth backend is running on `127.0.0.1:5000`

### /connectiontest
'GET' method to test the connection to server

```
    method : 'get'
    headers : {
        'Content-Type':'application/json'
    }
```
Response is message that indicate the server is running

### /generatepassword
'POST' method to get 4chars password for new user
```
    method : 'post'
    header : {
        'Content-Type':'application/json'
    }
    body : {
        'name':name,
        'phone':phone,
        'role':role
    }
```
Response is password if user does not exist in database and other message if user already exist or input is incorrect
### /signin
'POST' method to get JW_Token value and check whether user is exist or not
```
    method : 'post'
    header : {
        'Content-Type':'application/json'
        'Authorization':JW_Token
    }
    body : {
        'phone':phone,
        'password':password,
    }
```
if Authorization header is null, response will be callback value with user information and JW_Token value. If Authorization is exist, the respon will be user information

### /validatetoken
'GET' method to check user information with JW_Token
```
    method : 'get'
    header : {
        'Content-Type':'application/json'
        'Authorization':JW_Token
    }
```
If token value is correct, callback message will be user information. If now, there is callback message `Unauthorized` to inform that token is not correct

## Fetch
Fetch backend is running on `127.0.0.1:5001`

### /connectiontest
'GET' method to test the connection to server

```
    method : 'get'
    headers : {
        'Content-Type':'application/json'
    }
```
Response is callback with message that indicate the server is running

### /rawdata
'GET' method to get processed data from api based on role
* Admin -> Aggregation data
* Other -> Currency Conversion

```
    method : 'get'
    headers : {
        'Content-Type':'application/json'
        'Authorization':JW_Token
    }
```
Response is callback with data payloads, will not valid if token is not recorded

### /validatetoken
'GET' method to check user information with JW_Token
```
    method : 'get'
    header : {
        'Content-Type':'application/json'
        'Authorization':JW_Token
    }
```
If token value is correct, callback message will be user information. If now, there is callback message `Unauthorized` to inform that token is not correct


## Front End
Front end is running on `127.0.0.1:3000`

### /signin
Sign In and Generate Password page

### /main
Main page that will show queried data
