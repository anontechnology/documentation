# Storage Request

A storage request is the format in which data is entered into the vault.

## Definition

|Name |Type |Description|
|-----|-----|-----------|
|origin|String|The IP address of the system that obtained this data. This is used to determine the geographical jurisdiction the data falls under.|
|entityType|String|Optional. The [type](/glossary/entity-type) of the entity that this data belongs to. If this field is omitted, and the entity that this data belongs to does not already exist in the system, the entity will be created as a data subject. Specifying an entity type here will override this default behavior and instead create a new entity of the provided type.|
|data|Array<[Attribute](/glossary/attribute)>|List of attributes to store.|
