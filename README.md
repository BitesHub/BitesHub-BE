# Dokumentasi

## Registrasi Akun

Route : /register  
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

res.status(201).json :

```json
{
	"error": false,
	"status": "success",
	"message": "User Created"
}
```

## Login Akun

Route : /login  
Method : POST  
req.body :

```json
{
	"email": "email",
	"password": "password"
}
```

res.status(200).json :

```json
{
	"error": false,
	"status": "success",
	"message": "Login success",
	"loginResult": {
		"userId": "userId",
		"username": "username",
		"token": "token"
	}
}
```
