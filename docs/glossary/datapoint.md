# Attribute

Attributes are the form in which data in ViziVault is stored. Every attribute represents some piece of information about a user in the system. The [AttributeDefintion](/glossary/attribute.md) specifies the metadata and shape of the data being stored.

## Definition

The anatomy of a Attribute is as follows:

|Name |Type |Description|
|-----|-----|-----------|
|dataPointId|String|A globally unique identifier for this attribute.|
|userId|String|The identifier of the user this attribute belongs to.|
|attribute|String|The attribute key, which specifies the attribute definition that this attribute belongs to.|
|tags|Array<String>|A list of [tags](/glossary/tag) applied to this attribute, including any inherited from its attribute definition and its user.|
|sensitivity|String|How sensitive this attribute is. Possible values are `NORMAL`, `PERSONAL`, `SENSITIVE`, and `CONFIDENTIAL`.|
|value|(varies)|The actual value of this attribute. What type the value is depends on the [schema](/tutorials/attribute-schemas.md) of the attribute definition.|
|regulations|Array<String>|A list of [regulations](/glossary/regulation.md) that are applicable to this datapoint.|
|structureRootId|String|If this particular attribute represents a sub-attribute within a full attribute, this field contains the id of the root to that full attribute. See [Attribute schemas](/glossary/attribute-schemas.md) for more information on structured datapoints.|
|createdDate|String|An ISO 8601 representation of the timestamp when the attribute was created.|
|modifiedDate|String|An ISO 8601 representation of the timestamp when the attribute was most recently modified.|
