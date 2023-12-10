# Dokumentasi BitesHub API

## Registrasi Akun

Route : /register  
Method : POST  
request body :

```json
{
	"username": "username",
	"email": "email@mail",
	"password": "password",
	"confirmPass": "password"
}
```

response
Status Code (201)
json :

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
request body :

```json
{
	"email": "email",
	"password": "password"
}
```

response
status Code (200)
json :

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

## Postingan

### get all posts

Route : '/posts'  
Method : Get  
response
status Code (200)
json :

```json
{
	"error": false,
	"status": "success",
	"message": "Posts fetched successfully",
	"postsList": "data masih kosong"
}
```

### add a post

Route : '/posts'  
Method : Post  
request body :

```json
{
	"username": "username",
	"description": "description",
	"fileUrl": "file Url"
}
```

response
status code (201)
json :

```json
{
	"error": false,
	"status": "success",
	"message": "Post success"
}
```

### Get post detail

Route : '/posts/detail?id=idpostingan'  
Method : Get  
response
status code (200)
json :

```json
{
	"error": false,
	"status": "success",
	"message": "Post fetched successfully",
	"postDetail": {
        "createdAt": "createdAt",
        "description": "description",
        "fileUrl": "fileUrl",
        "username": "username"
    },
	"allComment": [
		{
			"id": "idComment",
			"data": {
				"createdAt": "createdAt",
				"comment": "comment",
				"username": "username"
			}
		},
	]
}
```

### add a comment in a post

Route : '/posts/comment'  
method : Post  
request body :

```json
{
	"id": "id post",
	"comment": "comment",
	"username": "username"
}
```

response
status code (201)
json :

```json
{
	"error": false,
	"status": "success",
	"message": "Comment successfuly added"
}
```

### Delete a post

Route : '/posts'  
Method : Delete  
request body :

```json
{
	"id": "idpostingan"
}
```

response
status code (200)
json :

```json
{
	"error": false,
	"status": "success",
	"message": "Document deleted successfully, id: idpostingan"
}
```

## Recipe

### Get all recipe

Route : '/recipes'  
Method : Get  
response
status code (200)
json :

```json
{
	"error": false,
	"status": "success",
	"message": "Success get all recipes",
	"data": [
		{
			"id": "idrecipe",
			"data": {
				"createdAt": "createdAt",
				"ingredients": "ingredients",
				"description": "descriptions",
				"fileUrl": "fileUrl",
				"title": "title",
				"username": "username"
			}
		}
	]
}
```

### add a recipe

Route : '/recipes'  
Method : Post  
request body :

```json
{
	"username": "username",
	"title": "title",
	"ingredients": "ingredients",
	"description": "description",
	"fileUrl": "fileUrl"
}
```

response
status code (200)
json :

```json
{
	"error": false,
	"status": "succes",
	"message": "Berhasil menambahkan resep"
}
```

### Get a recipe detail

Route : '/recipes?id=idrecipe'  
Method : get  
response
status code (200)
json :

```json
{
	"error": false,
	"status": "success",
	"message": "Success get recipe details",
	"data": {
		"createdAt": "createdAt",
		"ingredients": "ingredients",
		"description": "description",
		"fileUrl": "fileUrl",
		"title": "title",
		"username": "username"
	}
}
```

### delete a recipe

Route : '/recipes'  
Method : Delete  
request body :

```json
{
  "id": "idRecipe"
}
```
response
status code (200)
json :
```json
{
	"error": false,
	"status": "success",
	"message": "Berhasil hapus resep",
}
````
