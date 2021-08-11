# Tag

Tags can be used to specify additional metadata about data in the vault. This can be used to determine what regulations should apply to data or for other business-specific purposes. Data subjects and attribute definitions can each have tags associated with them; these tags will be propagated onto all associated attributes.

## Definition

The metadata associated with a tag is as follows:

|Name |Type |Description|
|-----|-----|-----------|
|name|String|An identifier for this tag.|
|createdDate|String|An ISO 8601 representation of the timestamp when the tag was created.|
|modifiedDate|String|An ISO 8601 representation of the timestamp when the tag was most recently modified.|

## Examples

An example tag definition:

```json
{
  "key" : "FINANCIAL",
  "name" : "Financial data",
  "createdDate" : "2020-01-01T02:18:54Z",
  "modifiedDate" : "2020-01-01T02:18:54Z"
}
```
