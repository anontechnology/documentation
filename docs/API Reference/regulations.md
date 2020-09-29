# Regulations

## GET /regulations
Retrieves data for all regulations in the system. Returns a list of [Regulation](#somewhere) objects.

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

## POST /regulations
Creates or edits a regulation. If there is an existing regulation in the system with the `key` of the provided regulation, that regulation will be updated; otherwise, a new regulation will be created.

### Parameters

#### Body Parameters (Required)
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|payload         |[RegulationDefinition](#somewhere)        |Description of new regulation |

### Example payload
For more information on how to specify rules for regulations, see [Regulation rules](#../tutorials/regulation-rules.md).

```json
{
    "key": "SAMPLE_REGULATION",
    "name": "Sample Regulation",
    "url": "https://example.com/regulation",
    "rule": "{}"
}
```

### Example response
```json
{
  "data": "Regulation created"
}
```

## GET /regulations/{regulation key}
Displays information about one regulation. Returns a [Regulation](#somewhere) object, or 404 Not Found if there is no regulation with the specified key.

### Path Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|Regulation key  |String                         |Key of the regulation to describe|

### Example response
```json
{ "data": 
  {
      "key": "SAMPLE_REGULATION",
      "name": "Sample Regulation",
      "url": "https://example.com/regulation",
      "createdDate": "2020-01-01T04:00:00Z",
      "modifiedDate": "2020-09-25T01:10:02Z"
  }
}
```

## DELETE /regulations/{regulation key}
Deletes a specified regulation, and untags it from all attributes. Returns 404 Not Found if there is no regulation with the specified key.

### Path Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|Regulation key  |String                         |Key of the regulation to delete|

### Example response
```json
{
  "data": "Regulation deleted"
}
```

## POST /regulations/{regulation key}/propagate
Updates what data is tagged with a specific regulation. Because regulations can depend on attribute values (for example, COPPA is applied to data belonging to people under the age of 13, but age is itself an attribute and is therefore stored encrypted), it is necessary to provide a private key to decrypt the relevant data.

### Path Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|Regulation key  |String                         |Key of the regulation to describe|

### Header Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|X-Decryption-Key|String                         |Private decryption key       |

### Example Response
Returns a list of how many data points were affected by this update.
```json
{
  "data" : {
    "added": 100,
    "removed": 100
  }
}
```