# Attributes

## POST /datasubjects
Stores metadata associated with a data subject. Returns a [Data Subject](/glossary/datasubject) object.

### Parameters

#### Body Parameters (Required)
|Name            |Type                            |Description                  |
|----------------|--------------------------------|-----------------------------|
|payload         |[Data Subject](/glossary/datasubject)|Description of data subject to store|

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

## GET /datasubjects
Retrieves metadata for all data subjects in the system. Returns a list of [Data Subject](/glossary/datasubject) objects.

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

## GET /datasubjects/{subjectId}
Displays information about one data subject. Returns a [Data Subject](/glossary/datasubjet) object.

### Path Parameters
|Name            |Type                        |Description                       |
|----------------|----------------------------|----------------------------------|
|subjectId       |String                      |ID of the data subject to describe|

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
|404        |Not found    |The system does not contain a data subject with the specified id.|
