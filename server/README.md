# Overcloud Server

This service is the backend server for Overcloud platform

## Requirements

Install the required dependencies:

```bash
npm install
```

## Start Service

To start the recommendation service, run the following command:

```bash
python manage.py runserver
```

## Run with Docker

```bash
docker run --name overcloud-server --pull always -d -p 8080:8080 danielvaknin/overcloud-server:latest

# View logs:
docker logs overcloud-server

# Delete container:
docker rm -f overcloud-server
```

# API Documentation

## User API

### Register

API for user register

| Method | Path             |
| :----- | :--------------- |
| `POST` | `/api/auth/register` |

#### Parameters

- `name` `(string: <required>)` – The display name of the user
- `email` `(string: <required>)` – The email of the user
- `password` `(string: <required>)` – The password of the user

#### Sample Payload

```json
{
  "name": "daniel",
  "email": "daniel@gmail.com",
  "password": "Aa123456"
}
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
  "username": "daniel@gmail.com",
  "password": "XXXXX"
}
```

#### Sample Request

```bash
$ curl \
    --request POST \
    --data @payload.json \
    http://localhost:8080/api/auth/login
```

## Cloud Account API

### List All Cloud Accounts

API getting information of cloud accounts

| Method | Path             |
| :----- | :--------------- |
| `GET` | `/api/cloud-accounts/<id>` |

#### Parameters

- `id` `(string: "")` – The id of the cloud account

#### Sample Request

```shell-session
# All cloud accounts
$ curl http://localhost:8080/api/cloud-accounts

# Specific cloud account
$ curl http://localhost:8080/api/cloud-accounts/60526ffb3a611c4670f2a38a
```

#### Sample Response

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

### Add Cloud Account

API for add cloud account

| Method | Path             |
| :----- | :--------------- |
| `POST` | `/api/cloud-accounts` |

#### Parameters

- `displayName` `(string: <required>)` – The display name of the cloud account
- `cloudProvider` `(string: <required>)` – The cloud provider (AWS, GCP, Azure, etc...)
- `accessKey` `(string: <required>)` – The AWS access key
- `secretKey` `(string: <required>)` – The AWS secret key

#### Sample Payload

```json
{
  "displayName": "test2",
  "cloudProvider": "AWS",
  "accessKey": "XXXXX",
  "secretKey": "XXXXX"
}
```

#### Sample Request

```bash
$ curl \
    --request POST \
    --data @payload.json \
    http://localhost:8080/api/cloud-accounts
```

### Delete Cloud Account

API for delete cloud account by id

| Method | Path             |
| :----- | :--------------- |
| `DELETE` | `/api/cloud-accounts/<id>` |

#### Parameters

- `id` `(string: <required>)` – The id of the cloud account

#### Sample Request

```bash
$ curl \
    --request DELETE \
    http://localhost:8080/api/cloud-accounts/<id>
```
