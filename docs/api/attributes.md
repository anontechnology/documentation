# Attribute Definitions

## POST /attributes
Creates or edits an attribute definition. If there is an existing attribute in the system with the `key` of the provided attribute, that attribute will be updated; otherwise, a new attribute will be created.

### Parameters

#### Body Parameters (Required)
|Name            |Type                            |Description                  |
|----------------|--------------------------------|-----------------------------|
|payload         |[AttributeDefinition](/glossary/attribute-definition)|Description of new attribute |

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
|400        |Attribute must contain at least one of key or name|Returned if an attribute definition is received that contains neither a key nor a name.|
|400        |Attribute key must contain only alphanumeric characters and underscores|Returned if the provided attribute key contains disallowed characters.|
|400        |Schema cannot be null|Returned if no [schema](/tutorials/attribute-schemas) was provided.|
|400        |Sub-attribute key contains unusable characters|Returned if a sub-attribute key contained in the attribute's [schema](/tutorials/attribute-schemas) contains disallowed characters.|
|400        |Schema has unexpected class|Returned if the [schema](/tutorials/attribute-schemas) of this attribute, or one of its sub-attributes, is netiher a JSON object nor a string (i.e. a number, a boolean value, a list, or `null`)|
|409        |Cannot change existing attribute from repeatable to non-repeatable, as it would invalidate existing data|Returned when edits to a repeatable attribute definition would make it become non-repeatable, if there are users that have multiple values for this attribute|
|409        |Cannot edit attribute schema, as it may invalidate existing data|Returned when attempting to specify a new schema for an attribute definition that is in use (editing the schema for an attribute definition that no data uses is allowed)|

## GET /attributes
Retrieves data for all attribute definitions in the system. Returns a list of [AttributeDefinition](/glossary/attribute-definition) objects.

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
Displays information about one attribute definition. Returns an [AttributeDefinition](/glossary/attribute-definition) object.

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
|409        |Cannot delete attribute, because it is in use|There is existing data in the system that uses this attribute definition, and as such the attribute definition cannot be deleted.|
|404        |Attribute not found|The system does not contain an attribute with the specified key.|
