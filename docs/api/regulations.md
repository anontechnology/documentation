# Regulations

## POST /regulations
Creates or edits a regulation. If there is an existing regulation in the system with the `key` of the provided regulation, that regulation will be updated; otherwise, a new regulation will be created.

### Parameters

#### Body Parameters (Required)
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|payload         |[Regulation](/glossary/regulation)|Description of new regulation |

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

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|400        |Cannot parse JSON of regulation rule|The rule provided is not valid JSON.|
|400        |Constraint type must be specified as a string|The rule provided contains constraints that do not have a type or whose type is not specified as a string.|
|422        |Attribute \[attribute\] not found|An attribute specified for a user attribute value constraint or an attribute list constraint in the regulation's rule does not exist.|
|422        |Category \[category\] not found|A category specified for a category list constraint in the regulation's rule does not exist.|
|422        |Attribute list operator \[operator\] is not supported.|An invalid operator was specified for an attribute list constraint. For more information on what operators are valid, see [Attribute list constraints](#../tutorials/regulation-rules.md#attribute-list-constraints).|
|422        |Category list operator \[operator\] is not supported.|An invalid operator was specified for a category list constraint. For more information on what operators are valid, see [Category list constraints](#../tutorials/regulation-rules.md#category-list-constraints).|
|422        |User-attribute constraint predicate \[predicate\] is not supported.|An invalid predicate was specified for a user attribute value constraint. For more information on what predicates are valid, see [User attribute constraints](#../tutorials/regulation-rules.md#user-attribute-constraints).|
|422        |Unrecognized constraint type|An invalid constraint type was specified. For more information on what constraint types are valid, see [Regulation rules](#../tutorials/regulation-rules.md)|



## POST /regulations/{regulationKey}/propagate
Updates what data is tagged with a specific regulation. Because regulations can depend on attribute values (for example, COPPA is applied to data belonging to people under the age of 13, but age is itself an attribute and is therefore stored encrypted), it is necessary to provide a private key to decrypt the relevant data.

### Path Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|regulationKey   |String                         |Key of the regulation to describe|

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

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|400        |Encoded key provided is invalid|The private decryption key provided is not correct.|
|404        |No such regulation|The system does not contain a regulation with the specified key.|

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

