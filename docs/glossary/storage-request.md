# Storage Request

A storage request is the format in which data is entered into the vault.

## Definition

|Name |Type |Description|
|-----|-----|-----------|
|origin|String|The IP address of the system that obtained this data. This is used to determine the geographical jurisdiction the data falls under.|
|entityType|String|The [type](/glossary/entity-type) of the entity that this data belongs to. This is necessary because if data is stored for an entity that is not known to the system, the entity is created implicitly.|
|data|Array<[Attribute](/glossary/attribute)>|List of attributes to store.|
