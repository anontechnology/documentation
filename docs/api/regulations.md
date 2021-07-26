# Regulations

## POST /regulations
Creates or edits a regulation. If there is an existing regulation in the system with the `key` of the provided regulation, that regulation will be updated; otherwise, a new regulation will be created.

### Parameters

#### Body Parameters (Required)
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|payload         |[Regulation](/glossary/regulation)|Description of new regulation |

### Example payload

```json
{
  "key": "SAMPLE_REGULATION",
  "name": "Sample Regulation",
  "url": "https://example.com/regulation"
}
```

### Example response
```json
{
  "data": "Regulation created"
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|402        |Your current subscription is limited to (number) custom regulations|Your current license has a hard limit on the number of regulations created, and you have reached the limit|


## GET /regulations
Retrieves data for all regulations in the system. Returns a list of [Regulation](/glossary/regulation) objects.

### Parameters
None

### Example response
```json
{
  "data" : [
    {
      "key": "SAMPLE_REGULATION",
      "name": "Sample Regulation",
      "url": "https://example.com/regulation",
      "createdDate": "2020-01-01T04:00:00Z",
      "modifiedDate": "2020-09-25T01:10:02Z"
    }
  ]
}
```

## GET /regulations/{regulationKey}
Displays information about one regulation. Returns a [Regulation](/glossary/regulation) object, or 404 Not Found if there is no regulation with the specified key.

### Path Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|regulationKey   |String                         |Key of the regulation to describe|

### Example response
```json
{
  "data": {
    "key": "SAMPLE_REGULATION",
    "name": "Sample Regulation",
    "url": "https://example.com/regulation",
    "createdDate": "2020-01-01T04:00:00Z",
    "modifiedDate": "2020-09-25T01:10:02Z"
  }
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|404        |No such regulation|The system does not contain a regulation with the specified key.|

## DELETE /regulations/{regulationKey}
Deletes a specified regulation, and untags it from all attributes. Returns 404 Not Found if there is no regulation with the specified key.

### Path Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|regulationKey   |String                         |Key of the regulation to delete|

### Example response
```json
{
  "data": "Regulation deleted"
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|404        |Regulation not found|The system does not contain a regulation with the specified key.|

