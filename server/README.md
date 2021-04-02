# API Documentation

## User API

### Register

API for user register

| Method | Path             |
| :----- | :--------------- |
| `POST` | `/api/auth/register` |

#### Parameters

- `email` `(string: <required>)` – The Email of the user
- `password` `(string: <required>)` – The password of the user
- `name` `(string: <required>)` – The display name of the user

#### Sample Payload

```json

```

#### Sample Request

```bash
$ curl \
    --request POST \
    --data @payload.json \
    http://localhost:8080/api/auth/register
```

### Login

API for user login

| Method | Path             |
| :----- | :--------------- |
| `POST` | `/api/auth/login` |

#### Parameters

- `username` `(string: <required>)` – The Email of the user
- `password` `(string: <required>)` – The password of the user

#### Sample Payload

```json
{
    "status": "ok"
}
```

#### Sample Request

```bash
$ curl \
    --request POST \
    --data @payload.json \
    http://localhost:8080/api/auth/login
```

### Cloud Account API

### List All Cloud Accounts

API for list all cloud accounts

| Method | Path             |
| :----- | :--------------- |
| `GET` | `/api/cloud-accounts/` |

#### Sample Payload

```json
[
  {
    "_id": "605f56b932a04f8690b318c4",
    "displayName": "test",
    "cloudProvider": "AWS",
    "accessKey": "test",
    "secretKey": "test",
    "__v": 0
  }
]
```

#### Sample Request

```bash
$ curl \
    --request GET \
    http://localhost:8080/api/cloud-accounts
```

### Add Cloud Account

API for add cloud account

| Method | Path             |
| :----- | :--------------- |
| `POST` | `/api/cloud-accounts` |

#### Parameters

- `displayName` `(string: <required>)` – The display name of the cloud account
- `cloudProvider` `(string: <required>)` – The cloud provider (AWS, GCP, AZURE, etc...)
- `accessKey` `(string: <required>)` – The AWS access key
- `secretKey` `(string: <required>)` – The AWS secret key

#### Sample Payload

```json
{
	"_id": "60526ffb3a611c4670f2a38a"
	,"displayName":"test account",
	"cloudProvider":"AWS"
	,"accessKey":"test"
	,"secretKey":"test",
	"__v":0
}
```

#### Sample Request

```bash
$ curl \
    --request POST \
    --data @payload.json \
    http://localhost:8080/api/cloud-accounts
```

### GET Cloud Account

API for get cloud account

| Method | Path             |
| :----- | :--------------- |
| `GET` | `/api/cloud-accounts/<id>` |

#### Parameters

- `id` `(string: <required>)` – The id of the cloud account

#### Sample Payload

```json
{
	"_id": "60526ffb3a611c4670f2a38a"
	,"displayName":"test account",
	"cloudProvider":"AWS"
	,"accessKey":"test"
	,"secretKey":"test",
	"__v":0
}
```

#### Sample Request

```bash
$ curl \
    --request GET \
    http://localhost:8080/api/cloud-accounts/<id>
```

### Delete Cloud Account

API for delete cloud account by id

| Method | Path             |
| :----- | :--------------- |
| `DELETE` | `/api/cloud-accounts/<id>` |

#### Parameters

- `id` `(string: <required>)` – The id of the cloud account

#### Sample Payload

```json
{
  "status": "ok"
}
```

#### Sample Request

```bash
$ curl \
    --request DELETE \
    http://localhost:8080/api/cloud-accounts/<id>
```

