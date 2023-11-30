# Dokumentasi 

## Registrasi Akun
Route : /users/register\n
Method : POST\n
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
Route : /users/login\n
Method : POST\n
req.body
```json
{
    "email": "email",
    "password": "password"
}
```
