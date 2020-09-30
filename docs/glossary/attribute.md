# Attribute

Attributes are how the ViziVault ecosystem organizes your data. Every data point consists of three main components: a user id, which represents who the data is about; a value, which is some piece of information about the user; and an attribute, which expresses the relationship between the user and the value. For example, in an online retail application, there would be an attribute for shipping addresses, an attribute for billing addresses, and an attribute for credit card information.

## Definition

There are several forms of metadata associated with attributes, as follows:

|Name |Type |Description|
|-----|-----|-----------|
|key|String|An unambiguous identifier for this attribute. Only alphanumeric characters and underscores may appear in attribute keys.|
|name|String|A human-readable identifier for this attribute.|
|categories|List of strings|A list of [category keys](/docs/glossary/category.md), each representing a grouping this attribute falls under. Categories can be used to group related attributes and to facilitate tracking what regulations are applicable to an attribute.|
|hint|String|An example value that this attribute could take.|
|immutable|boolean|Whether this attribute is a pre-loaded attribute provided by ViziVault that cannot be modified through the web interface.|
|indexed|boolean|Whether this attribute's value should be indexed to allow searching on it. For more information, read [the Search tutorial](/docs/tutorials.search.md).|
|createdDate|String|An ISO 8601 representation of the timestamp when the attribute was created.|
|modifiedDate|String|An ISO 8601 representation of the timestamp when the attribute was most recently modified.|
|mandatory|boolean|If true, it is not valid for the system to contain users with no value for this attribute.|
|schema|[Attribute schema](/docs/tutorials/attribute-schemas.md)|A representation of the structure of data this attribute is expected to have, including any sub-attributes, and whether its data is textual, numeric, or other formats. Read [the Attribute Schemas tutorial](/docs/tutorials/attribute-schemas.md) for more information.|
|repeatable|boolean|Whether a user should be able to have multiple values for this attribute.|
|regulations|List of strings|A list of [regulation keys](/docs/glossary/regulation.md), each representing a regulation that is applicable to all datapoints of this attribute.|

## Examples

An example attribute definition representing a user's billing address:

```json
{
  "key" : "BILLING_ADDRESS",
  "name" : "Billing address",
  "categories": ["geographic_location", "financial"],
  "hint" : "{\n  \"line_one\": \"1 Hacker Way\".\n  \"line_two\": \"Apt. 53\",\n  \"city\": \"Menlo Park\",\n  \"state\": \"California\",\n  \"postal_code\": \"94025-1456\",\n  \"country\": \"USA\"\n}",
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
  "mandatory" : true,
  "indexed": false,
  "regulations" : ["GDPR", "CCPA"],
  "createdDate" : "2020-01-01T02:18:54Z",
  "modifiedDate" : "2020-01-01T02:18:54Z"
}
```