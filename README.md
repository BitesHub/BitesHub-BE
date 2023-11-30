# Dokumentasi 

## Registrasi Akun
Route : /users/register 
Method : POST
req.body :
{
    "username": "username",
    "email": "email@mail",
    "password": "password",
    "confirmPass": "password"
}

## Login Akun
Route : /users/login
Method : POST
req.body
{
    "email": "email",
    "password": "password"
}
