# Dokumentasi 

## Registrasi Akun
Route : /users/register 
Method : POST
req.body :
```json
{
    "username": "username",
    "email": "email@mail",
    "password": "password",
    "confirmPass": "password"
}
```

## Login Akun
Route : /users/login
Method : POST
req.body
```json
{
    "email": "email",
    "password": "password"
}
```
