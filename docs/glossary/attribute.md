# Attribute

Attributes are the form in which data in ViziVault is stored. Every attribute represents some piece of information about a user in the system. The [AttributeDefintion](/glossary/attribute-definition) that an attribute belongs to specifies important metadata about the nature of the data.

## Definition

The anatomy of a Attribute is as follows:

|Name |Type |Description|
|-----|-----|-----------|
|dataPointId|String|A globally-unique identifier for this attribute.|
|userId|String|The identifier of the user this attribute belongs to.|
|attribute|String|The attribute key, which specifies the attribute definition that this attribute belongs to.|
|tags|Array<String>|A list of [tags](/glossary/tag) applied to this attribute, including any inherited from its attribute definition or its user.|
|sensitivity|String|How sensitive this attribute is. Possible values are `NORMAL`, `PERSONAL`, `SENSITIVE`, and `CONFIDENTIAL`.|
|value|(varies)|The actual value of this attribute. What type the value is depends on the [schema](/tutorials/attribute-schemas) of the attribute definition.|
|regulations|Array<String>|A list of [regulations](/glossary/regulation) that are applicable to this datapoint. These can be automatically populated by [rules](/tutorials/regulation-rules) applied to regulations.|
|structureRootId|String|If this particular attribute represents a sub-attribute within a structured attribute, this field contains the datapoint id of the root of that structure. See [Attribute schemas](/tutorials/attribute-schemas) for more information on structured datapoints.|
|reportOnly|Boolean|If true, indicates that the ViziVault system is being used to report on this data point but not to store it. As sucn, it will not be possible to read the value of this datapoint. In this case, providing the value while storing the attribute is optional.|
|createdDate|String|An ISO 8601 representation of the timestamp when the attribute was created.|
|modifiedDate|String|An ISO 8601 representation of the timestamp when the attribute was most recently modified.|
