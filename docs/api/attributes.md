# Attribute Definitions

## POST /attributes
Creates or edits an attribute definition. If there is an existing attribute in the system with the `key` of the provided attribute, that attribute will be updated; otherwise, a new attribute will be created.

### Parameters

#### Body Parameters (Required)
|Name            |Type                            |Description                  |
|----------------|--------------------------------|-----------------------------|
|payload         |[AttributeDefinition](/glossary/attribute)|Description of new attribute |

### Example payload

```json
{
  "key": "SAMPLE_ATTRIBUTE",
  "name": "Sample Attribute",
  "tags": [
    "age",
    "financial",
    "geographic"
  ],
  "hint": "example data for this attribute",
  "immutable": false,
  "indexed": false,
  "regulations": [ "GDPR", "CCPA" ],
  "repeatable": true,
  "schema": "string"
}
```

### Example response
On success, returns 201 Created and a description of the updated attribute.

```json
{
  "data": {
    "key": "SAMPLE_ATTRIBUTE",
    "name": "Sample Attribute",
    "tags": [
      "age",
      "financial",
      "geographic"
    ],
    "hint": "example data for this attribute",
    "immutable": false,
    "indexed": false,
    "regulations": [ "GDPR", "CCPA" ],
    "repeatable": true,
    "schema": "string",
    "createdDate": "2020-09-03T02:18:54Z",
    "modifiedDate": "2020-09-24T18:28:29Z",
  }
}
```
### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|400        |Attribute key must contain only alphanumeric characters and underscores|Returned if the provided attribute key contains disallowed characters.|
|400        |Sub-attribute key contains unusable characters|Returned if a sub-attribute key contained in the attribute's [schema](/tutorials/attribute-schemas) contains disallowed characters.|
|400        |Schema has unexpected class|Returned if the [schema](/tutorials/attribute-schemas) of this attribute, or one of its sub-attributes, is netiher a JSON object nor a string (i.e. numbers, booleans, or `null`)|
|

## GET /attributes
Retrieves data for all attribute definitions in the system. Returns a list of [AttributeDefinition](/glossary/attribute) objects.

### Parameters
None

### Example response
```json
{
  "data": [
    {
      "key": "SAMPLE_ATTRIBUTE",
      "name": "Sample Attribute",
      "tags": ["financial", "medical"],
      "hint": "example data for this attribute",
      "immutable": false,
      "indexed": true,
      "createdDate": "2020-09-03T02:18:54Z",
      "modifiedDate": "2020-09-24T18:28:29Z",
      "schema": "string",
      "repeatable": false,
      "regulations": [ "GDPR", "HIPAA" ]
    }
  ]
}
```

## GET /attributes/{attributeKey}
Displays information about one attribute definition. Returns an [AttributeDefinition](/glossary/attribute) object.

### Path Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|attributeKey    |String                         |Key of the attribute definition to describe |

### Example response
```json
{
  "data": {
    "key": "SAMPLE_ATTRIBUTE",
    "name": "Sample Attribute",
    "tags": [
      "age",
      "financial",
      "geographic"
    ],
    "hint": "example data for this attribute",
    "immutable": false,
    "indexed": false,
    "regulations": [ "GDPR", "CCPA" ],
    "repeatable": true,
    "schema": "string",
    "createdDate": "2020-09-03T02:18:54Z",
    "modifiedDate": "2020-09-24T18:28:29Z",
  }
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|404        |No such attribute|The system does not contain an attribute with the specified key.|


## DELETE /attributes/{attributeKey}
Deletes an attribute definition if it is not being used.

### Path Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|attributeKey    |String                         |Key of the attribute definition to delete |

### Example response
```json
{
  "data": "Successfully Deleted Attribute"
}
```

### Error responses
|Status code|Error message|Description|
|403        |Cannot delete attribute, because it is in use|There is existing data in the system that uses this attribute definition, and as such the attribute definition cannot be deleted.|
|404        |Attribute not found|The system does not contain an attribute with the specified key.|