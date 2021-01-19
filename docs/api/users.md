# Attributes

## GET /users
Retrieves data for all users in the system. Returns a list of [User](/glossary/user) objects.

### Parameters
None

### Example response
```json
{
  "data": {
    "id": "0001",
    "tags": [],
    "created": "2020-09-03T02:18:54Z",
    "updated": "2020-09-24T18:28:29Z",
  }
}
```

## GET /users/{userId}
Displays information about one user. Returns a [User](/glossary/user) object.

### Path Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|userId          |String                         |ID of the user to describe   |

### Example response
```json
{
  "data": [
    {
      "id": "0001",
      "tags": [],
      "created": "2020-09-03T02:18:54Z",
      "updated": "2020-09-24T18:28:29Z",
    },
    {
      "id": "0002",
      "tags": [],
      "created": "2020-09-03T02:18:54Z",
      "updated": "2020-09-24T18:28:29Z",
    },
  ]
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|404        |Not found    |The system does not contain an user with the specified id.|
