# Attributes

## GET /attributes
Retrieves data for all attributes in the system. Returns a list of [Attribute](/docs/glossary/attribute) objects.

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

## POST /attributes
Creates or edits an attribute. If there is an existing attribute in the system with the `key` of the provided attribute, that attribute will be updated; otherwise, a new attribute will be created.

### Parameters

#### Body Parameters (Required)
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|payload         |[Attribute](/docs/glossary/attribute)        |Description of new attribute |

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

## GET /attributes/{attributeKey}
Displays information about one attribute. Returns an [Attribute](/docs/glossary/attribute) object.

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