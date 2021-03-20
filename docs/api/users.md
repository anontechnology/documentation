# Attributes

## POST /entities
Stores metadata for the given entity

Identical to [POST /users](#post-users), but stores metadata for entities rather than users.

## POST /users
Stores metadata associated with a user. Returns a [User](/glossary/user) object.

### Parameters

#### Body Parameters (Required)
|Name            |Type                            |Description                  |
|----------------|--------------------------------|-----------------------------|
|payload         |[User](/glossary/user)|Description of user to store|

### Example payload
```json
{
  "id": "0001",
  "tags": ["ExampleTag"]
}
```

### Example response
```json
{
  "data": {
    "id": "0001",
    "tags": ["ExampleTag"],
    "created": "2020-09-03T02:18:54Z",
    "updated": "2020-09-24T18:28:29Z",
  }
}
```

## GET /entities
Retrieves metadata for all entities

Identical to [GET /users](#get-users), but retrieves metadata for entities rather than users.

## GET /entities/{entityId}
Retrieves metadata for the given entity

Identical to [GET /users/{userId}](#get-usersuserid), but retrieves metadata for an entity rather than a user.

## GET /users
Retrieves metadata for all users in the system. Returns a list of [User](/glossary/user) objects.

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
