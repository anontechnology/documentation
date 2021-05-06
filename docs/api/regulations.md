# Regulations

## POST /regulations
Creates or edits a regulation. If there is an existing regulation in the system with the `key` of the provided regulation, that regulation will be updated; otherwise, a new regulation will be created.

### Parameters

#### Body Parameters (Required)
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|payload         |[Regulation](/glossary/regulation)|Description of new regulation |

### Example payload
For more information on how to specify rules for regulations, see [Regulation rules](/tutorials/regulation-rules).

```json
{
  "key": "SAMPLE_REGULATION",
  "name": "Sample Regulation",
  "url": "https://example.com/regulation",
  "rule": null
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
|400        |Attribute list operator \[operator\] is not supported.|An invalid operator was specified for an attribute list constraint. For more information on what operators are valid, see [Attribute list constraints](/tutorials/regulation-rules#attribute-list-constraints).|
|400        |Tag list operator \[operator\] is not supported.|An invalid operator was specified for a tag list constraint. For more information on what operators are valid, see [Tag list constraints](/tutorials/regulation-rules#tag-list-constraints).|
|400        |User-attribute constraint predicate \[predicate\] is not supported.|An invalid predicate was specified for a user attribute value constraint. For more information on what predicates are valid, see [User attribute constraints](/tutorials/regulation-rules#user-attribute-value-constraints).|
|400        |Unrecognized constraint type|An invalid constraint type was specified. For more information on what constraint types are valid, see [Regulation rules](/tutorials/regulation-rules)|
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

