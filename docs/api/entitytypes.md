# Entity Types

## POST /entitytypes
Creates or edits an entity type. If there is an existing entity type in the system with the provided `key`, that type will be updated; otherwise, a new entity type will be created.

### Parameters

#### Body Parameters (Required)
|Name            |Type                            |Description                  |
|----------------|--------------------------------|-----------------------------|
|payload         |[EntityType](/glossary/entity-type)|Description of new entity type|

### Example payload

```json
{
  "key": "sampleEntityType",
  "name": "Sample Entity Type",
  "description": "An example of an entity type"
}
```

<!---### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|400        |Entity type must contain at least one of key or name|Returned if an entity type is received that contains neither a key nor a name.|
|400        |Attribute key must contain only alphanumeric characters and underscores|Returned if the provided attribute key contains disallowed characters.|
|402        |Your current subscription is limited to (number) custom entity types|Your current license has a hard limit on the number of entity types created, and you have reached the limit|-->

## GET /entitytypes
Retrieves data for all entity types in the system. Returns a list of [EntityType](/glossary/entity-type) objects.

### Parameters
None

### Example response
```json
{
  "data": [
    {
      "key": "sampleEntityType",
      "name": "Sample Entity Type",
      "description": "An example of an entity type"
    },
    {
      "key": "datasubject",
      "name": "Data Subject",
      "description": "A natural person about whom data is collected"
    }
  ]
}
```

## GET /entitytypes/{typeKey}
Displays information about one entity type. Returns an [EntityType](/glossary/entity-type) object.

### Path Parameters
|Name       |Type   |Description                  |
|-----------|-------|-----------------------------|
|typeKey    |String |Key of the entity type to describe|

### Example response
```json
{
  "data": {
    "key": "datasubject",
    "name": "Data Subject",
    "description": "A natural person about whom data is collected"
  }
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|404        |No such entity type|The system does not contain an entity type with the specified key.|


## DELETE /entitytypes/{typeKey}
Deletes an entity type if it is not being used.

### Path Parameters
|Name       |Type   |Description                  |
|-----------|-------|-----------------------------|
|typeKey    |String |Key of the entity type to delete |

### Example response
```json
{
  "data": "Successfully Deleted Entity Type"
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|405        |Cannot delete entity type, as it is managed by the system|You are trying to delete an entity type such as `datasubject` that is required for the functioning of the system.|
|409        |Cannot delete entity type, as there are entities belonging to it|There are existing entities in the system that belong to this entity type, and as such it cannot be deleted.|
|409        |Cannot delete entity type, as there are attributes referencing it|There are attribute definitions in the system that are applicable to this entity type, and as such it cannot be deleted until it has been removed from those types.|
|404        |Entity type not found|The system does not contain an attribute with the specified key.|
