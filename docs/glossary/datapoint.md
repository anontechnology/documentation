# Datapoint

Datapoints are the form in which data in ViziVault is stored. Every datapoint represents some piece of information about a user in the system; the datapoint's [attribute](/glossary/attribute.md) specifies what the relationship of the datapoint's value to that user is.

## Definition

The anatomy of a datapoint is as follows:

|Name |Type |Description|
|-----|-----|-----------|
|dataPointId|String|A globally unique identifier for this datapoint.|
|userId|String|The identifier of the user this datapoint belongs to.|
|attribute|String|The attribute key of the attribute this datapoint belongs to. See [Attributes](/glossary/attribute.md) for more information.|
|sensitivity|String|How sensitive this datapoint is. Possible values are `NORMAL`, `PERSONAL`, `SENSITIVE`, and `CONFIDENTIAL`.|
|value|(varies)|The actual value of this datapoint. What type the value is depends on the [schema](/tutorials/attribute-schemas.md) of this datapoint's attribute.|
|regulations|Array<String>|A list of [regulations](/glossary/regulation.md) that are applicable to this datapoint.|
|structureRootId|String|If this datapoint represents a portion of a structured datapoint, this field contains the datapoint id of that structured datapoint. See [Attribute schemas](/glossary/attribute-schemas.md) for more information on structured datapoints.|
|createdDate|String|An ISO 8601 representation of the timestamp when the attribute was created.|
|modifiedDate|String|An ISO 8601 representation of the timestamp when the attribute was most recently modified.|
