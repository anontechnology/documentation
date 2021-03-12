# Attribute Defintions

Attributes are how the ViziVault ecosystem organizes your data. Every data point consists of two main components: a user id (or entity id), which represents who the data is about; and an attribute, which is some piece of information about the user; For example, in an online retail application, there would be an attribute for shipping addresses, an attribute for billing addresses, and an attribute for credit card information.

## Definition

There are several forms of metadata associated with attributes, as follows:

|Name |Type |Description|
|-----|-----|-----------|
|key|String|An unambiguous identifier for this attribute. Only alphanumeric characters and underscores may appear in attribute keys.|
|name|String|A human-readable identifier for this attribute.|
|tags|Array<String>|A list of [tags](/glossary/tag) that should be applied to all datapoints under this attribute.|
|hint|String|An example value that this attribute could take.|
|immutable|boolean|Whether this attribute is a pre-loaded attribute provided by ViziVault that cannot be modified through the web interface.|
|indexed|boolean|Whether this attribute's value should be indexed to allow searching on it. For more information, read [the Search tutorial](/tutorials/search).|
|createdDate|String|An ISO 8601 representation of the timestamp when the attribute was created.|
|modifiedDate|String|An ISO 8601 representation of the timestamp when the attribute was most recently modified.|
|schema|[Attribute schema](/tutorials/attribute-schemas)|A representation of the structure of data this attribute is expected to have, including any sub-attributes, and whether its data is textual, numeric, or other formats. Read [the Attribute Schemas tutorial](/tutorials/attribute-schemas) for more information.|
|repeatable|boolean|Whether a user should be able to have multiple values for this attribute.|
|regulations|Array<String>|A list of [regulation keys](/glossary/regulation), each representing a regulation that is applicable to all datapoints of this attribute.|

## Examples

An example attribute definition representing a user's billing address:

```json
{
  "key" : "BILLING_ADDRESS",
  "name" : "Billing address",
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