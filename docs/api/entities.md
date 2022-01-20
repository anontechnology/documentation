# Attributes

## POST /entities
Stores metadata associated with an entity. Returns an [Entity](/glossary/datasubject) object.

### Parameters

#### Body Parameters (Required)
|Name            |Type                            |Description                  |
|----------------|--------------------------------|-----------------------------|
|payload         |[Entity](/glossary/datasubject)|Description of entity to store|

### Example payload
```json
{
  "id": "user0001",
  "type": "datasubject",
  "tags": ["ExampleTag"]
}
```

### Example response
```json
{
  "data": {
    "id": "user0001",
    "type": "datasubject",
    "tags": ["ExampleTag"],
    "legalHold": false,
    "created": "2020-09-03T02:18:54Z",
    "updated": "2020-09-24T18:28:29Z",
  }
}
```

## GET /entities/{entityId}
Displays information about one entity. Returns an [Entity](/glossary/datasubject) object.

### Path Parameters
|Name            |Type                        |Description                       |
|----------------|----------------------------|----------------------------------|
|entityId       |String                      |ID of the entity to describe|

### Example response
```json
{
  "data": {
    "id": "user0001",
    "type": "datasubject",
    "tags": [],
    "legalHold": false,
    "created": "2020-09-03T02:18:54Z",
    "updated": "2020-09-24T18:28:29Z",
  }
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|404        |Not found    |The system does not contain an entity with the specified id.|

## GET /entities
Retrieves metadata for all entities in the system. Returns a list of [Entity](/glossary/datasubject) objects.

### Parameters
None

### Example response
```json
{
  "data": [
    {
      "id": "user0001",
      "type": "datasubject",
      "tags": [],
      "legalHold": false,
      "created": "2020-09-03T02:18:54Z",
      "updated": "2020-09-24T18:28:29Z",
    },
    {
      "id": "user0002",
      "type": "datasubject",
      "tags": [],
      "legalHold": false,
      "created": "2020-09-03T02:18:54Z",
      "updated": "2020-09-24T18:28:29Z",
    },
  ]
}
```

## POST /datasubjects

See [POST /entities](#post-entities). It is not necessary to specify the entity type when using this endpoint, as it will be assumed to be `datasubject`.

## GET /datasubjects/{entityId}

See [GET /entities/{entityId}](#get-entitiesentityid).

### Additional error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|400        |Entity is not a data subject|The entity with the specified ID is not a data subject.|


## GET /datasubjects

Retrieves metadata for all data subjects in the system (that is, all entities that belong to the `datasubject` type).
