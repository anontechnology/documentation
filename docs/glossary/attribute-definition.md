# Attribute Defintions

Attribute definitions are how the ViziVault ecosystem organizes your data. Every [attribute](/glossary/attribute) in the system consists of a data subject id, which represents who the data is about; a value, which is the data being stored; and an attribute key, which specifies what attribute definition governs the structure of the data. For example, in an online retail application, there would be an attribute definition for shipping addresses, an attribute definition for billing addresses, an attribute definition for credit card information, and so on.

## Definition

There are several forms of metadata associated with attributes, as follows:

|Name |Type |Description|
|-----|-----|-----------|
|key|String|An unambiguous identifier for this attribute. Only alphanumeric characters and underscores may appear in attribute keys.|
|name|String|A human-readable identifier for this attribute.|
|entityTypes|Array%lt;String%gt;|A list of [entity types](/glossary/entity-type) that this attribute is applicable to.|
|tags|Array%lt;String%gt;|A list of [tags](/glossary/tag) that should be applied to all attributes belonging to this attribute definition.|
|hint|String|An example value that this attribute could take.|
|immutable|boolean|Whether this is a pre-loaded attribute definition provided by ViziVault that cannot be modified through the web interface.|
|indexed|boolean|Whether values of this attribute should be indexed to allow searching on it. For more information, read [the Search tutorial](/tutorials/search).|
|createdDate|String|An ISO 8601 representation of the timestamp when the attribute definition was created.|
|modifiedDate|String|An ISO 8601 representation of the timestamp when the attribute definition was most recently modified.|
|schema|[Attribute schema](/tutorials/attribute-schemas)|A representation of the structure of data belonging to this attribute is expected to have, including any sub-attributes, and whether its data is textual, numeric, or other formats. Read [the Attribute Schemas tutorial](/tutorials/attribute-schemas) for more information.|
|repeatable|boolean|Whether a data subject should be able to have multiple values for this attribute.|
|regulations|Array%lt;String%gt;|A list of [regulation keys](/glossary/regulation), each representing a regulation that will be applied to all attributes belonging to this attribute definition.|

## Examples

An example attribute definition representing a data subject's billing address:

```json
{
  "key" : "BILLING_ADDRESS",
  "name" : "Billing address",
  "entityTypes" ["datasubject"],
  "tags": ["geographic_location", "financial"],
  "hint" : "{ line_one: \"1 Hacker Way\", line_two: \"Apt. 53\", city: \"Menlo Park\", state: \"California\", postal_code: \"94025-1456\", country: \"USA\"}",
  "schema": {
    "line_one": "string",
    "line_two": "string",
    "city": "string",
    "state": "string",
    "postal_code": "string",
    "country": "string"
  },
  "repeatable": false,
  "immutable": false,
  "indexed": false,
  "regulations" : ["GDPR", "CCPA"],
  "createdDate" : "2020-01-01T02:18:54Z",
  "modifiedDate" : "2020-01-01T02:18:54Z"
}
```
