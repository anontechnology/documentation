# Attributes

## POST /attributes
Creates or edits an attribute. If there is an existing attribute in the system with the `key` of the provided attribute, that attribute will be updated; otherwise, a new attribute will be created.

### Parameters

#### Body Parameters (Required)
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|payload         |[Attribute](/glossary/attribute)        |Description of new attribute |

### Example payload

```json
{
  "key": "SAMPLE_ATTRIBUTE",
  "name": "Sample Attribute",
  "categories": [
    "age",
    "financial",
    "geographic"
  ],
  "hint": "example data for this attribute",
  "immutable": false,
  "indexed": false,
  "mandatory": true,
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
    "categories": [
      "age",
      "financial",
      "geographic"
    ],
    "hint": "example data for this attribute",
    "immutable": false,
    "indexed": false,
    "mandatory": true,
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
Retrieves data for all attributes in the system. Returns a list of [Attribute](/glossary/attribute) objects.

### Parameters
None

### Example response
```json
{
  "data": [
    {
      "key": "SAMPLE_ATTRIBUTE",
      "name": "Sample Attribute",
      "categories": ["financial", "medical"],
      "hint": "example data for this attribute",
      "immutable": false,
      "indexed": true,
      "createdDate": "2020-09-03T02:18:54Z",
      "modifiedDate": "2020-09-24T18:28:29Z",
      "mandatory": false,
      "schema": "string",
      "repeatable": false,
      "regulations": [ "GDPR", "HIPAA" ]
    }
  ]
}
```

## GET /attributes/{attributeKey}
Displays information about one attribute. Returns an [Attribute](/glossary/attribute) object.

### Path Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|attributeKey    |String                         |Key of the attribute to describe        |

### Example response
```json
{
  "data": {
    "key": "SAMPLE_ATTRIBUTE",
    "name": "Sample Attribute",
    "categories": [
      "age",
      "financial",
      "geographic"
    ],
    "hint": "example data for this attribute",
    "immutable": false,
    "indexed": false,
    "mandatory": true,
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
