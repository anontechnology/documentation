# Attribute

Attributes are the form in which data in ViziVault is stored. Every attribute represents some piece of information about an entity in the system. The [attribute defintion](/glossary/attribute-definition) that an attribute belongs to specifies important metadata about the nature of the data.

## Definition

The anatomy of a Attribute is as follows:

|Name |Type |Description|Included when storing|
|-----|-----|-----------|---------------------|
|dataPointId|String|A globally-unique identifier for this attribute.||
|entityId|String|The identifier of the enitity this attribute belongs to.||
|attribute|String|The attribute key, which specifies the attribute definition that this attribute belongs to.|X|
|tags|Array%lt;String%gt;|A list of [tags](/glossary/tag) applied to this attribute, including any inherited from its attribute definition or its entity.|X|
|sensitivity|String|How sensitive this attribute is. Possible values are `NORMAL`, `PERSONAL`, `SENSITIVE`, and `CONFIDENTIAL`.|X|
|value|(varies)|The actual value of this attribute. What type the value is depends on the [schema](/tutorials/attribute-schemas) of the attribute definition.|X|
|regulations|Array%lt;String%gt;|A list of [regulations](/glossary/regulation) that are applicable to this datapoint. These can be specified manually, or they can be drawn from the regulations associated with this datapoint's [attribute definition](/glossary/attribute-definition). Additionally, [rules](/tutorials/rules) can be specified to automatically populate the list of applicable regulations based on more sophisticated criteria.|X|
|reportOnly|Boolean|If true, indicates that the ViziVault system is being used to report on this data point but not to store it. This means that it will not be possible to read the value of this datapoint, and that providing the value while storing the attribute is optional.|X|
|createdDate|String|An ISO 8601 representation of the timestamp when the attribute was created.||
|modifiedDate|String|An ISO 8601 representation of the timestamp when the attribute was most recently modified.||
