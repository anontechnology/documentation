# Entity

An entity object represents a person (that is, a data subject), organization, or object that data is stored about in the vault. Every attribute has an associated entity.

## Definition

The metadata associated with an entity is as follows:

|Name |Type |Description|
|-----|-----|-----------|
|id|String|A unique identifier for this entity.|
|type|String|The [type](/glossary/entity-type) of this entity.|
|tags|Array%lt;String%gt;|A list of [tags](/glossary/tag) that should be automatically applied to all attributes for this entity.|
|legalHold|boolean|Indicates whether this entity is under a legal hold. If `true`, all destructive actions (deleting or overwriting data) are prevented.|
|created|String|An ISO 8601 representation of the timestamp when the entity was created.|
|modified|String|An ISO 8601 representation of the timestamp when the entity (or the associated data) was most recently modified.|

## Examples

An example entity definition:

```json
{
  "id": "user0001",
  "type": "datasubject",
  "tags": ["ExampleTag"],
  "legalHold": false,
  "created": "2020-09-03T02:18:54Z",
  "updated": "2020-09-24T18:28:29Z",
}
```
