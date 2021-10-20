# Data Subject

A data subject object represents a person, organization, or object that data is stored about in the vault. Every attribute has an associated data subject.

## Definition

The metadata associated with a data subject is as follows:

|Name |Type |Description|
|-----|-----|-----------|
|id|String|A unique identifier for this data subject.|
|tags|Array<String>|A list of [tags](/glossary/tag) that should be automatically applied to all attributes for this data subject.|
|legalHold|boolean|Indicates whether this data subject is under a legal hold. If `true`, all destructive actions (deleting or overwriting data) are prevented.|
|created|String|An ISO 8601 representation of the timestamp when the data subject was created.|
|modified|String|An ISO 8601 representation of the timestamp when the data subject (or the associated data) was most recently modified.|

## Examples

An example tag definition:

```json
{
  "data": {
    "id": "0001",
    "tags": ["ExampleTag"],
    "legalHold": false,
    "created": "2020-09-03T02:18:54Z",
    "updated": "2020-09-24T18:28:29Z",
  }
}
```
