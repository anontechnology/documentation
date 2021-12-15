# Entity Type

An entity type object represents a category of person, organization, or object about which data can be stored. For use cases focusing solely on compliance with personal privacy regulations such as GDPR or CCPA, the built-in `datasubject` entity type should be sufficient, but in more complex situations it may be useful to create additional entity types for concepts such as employees, companies, or products.

## Definition

The metadata associated with an entity type is as follows:

|Name |Type  |Description|
|-----|------|-----------|
|key  |String|An unambiguous identifier for this entity type. Only alphanumeric characters and underscores may appear in entity type keys.|
|name |String|A human-readable identifier for this entity type.|
|description|String|An explanation of what this entity type represents.|

## Examples

An example entity type definition:

```json
{
  "key": "supplier",
  "name": "Product supplier",
  "description": "A company from which products are purchased"
}
```
