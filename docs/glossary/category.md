# Category

Categories can be used to group related attributes, making it easier to understand the structure of the data you have and to determine what regulations apply to it.

## Definition

The metadata associated with a category is as follows:

|Name |Type |Description|
|-----|-----|-----------|
|key|String|An unambiguous identifier for this category.|
|name|String|A human-readable identifier for this category.|
|createdDate|String|An ISO 8601 representation of the timestamp when the category was created.|
|modifiedDate|String|An ISO 8601 representation of the timestamp when the category was most recently modified.|

## Examples

An example category definition:

```json
{
  "key" : "FINANCIAL",
  "name" : "Financial data",
  "createdDate" : "2020-01-01T02:18:54Z",
  "modifiedDate" : "2020-01-01T02:18:54Z"
}
```