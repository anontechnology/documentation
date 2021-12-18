# Entity and Data Subject Attributes

## POST /entities/{entityId}/attributes
Stores attributes for the given entity.

For each attribute stored, if the attribute is repeatable, existing data in the vault will not be affected. If the attribute is not repeatable, existing data will be overwritten. If you want to make modifications to a nonrepeatable attribute, the best way is to read the current value, make changes as necessary, and then store the complete modified attribute.

If the entity specified does not currently exist in the system, it will be created. By default, the entity will be created as a data subject; the `entityType` field on the StorageRequest object can be used to override this by specifying a different type of entity to create.

### Header Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|X-Encryption-Key|String                         |Public encryption key        |

### Body Parameters (Required)
|Name                |Type                           |Description      |
|--------------------|-------------------------------|-----------------|
|payload             |[StorageRequest](/glossary/storage-request)|Storage Request  |

### Path Variables
|Name               |Type                          |Description      |
|-------------------|------------------------------|-----------------|
|entityId           |String                        |Entity Identifier|


### Example Payload
```json
{
  "data": [
    {
      "accessibility": "Read Only",
      "attribute": "SAMPLE_ATTRIBUTE",
      "dataPointId": "string",
      "regulations": ["SAMPLE_REGULATION"],
      "sensitivity": "PERSONAL",
      "reportOnly": false,
      "value": "123-456-789"
    }
  ],
  "entityType": "datasubject",
  "namespace": "Example_Namespace",
  "origin": "127.0.0.1"
}
```

### Example Response
```json
{
  "data": [
    {
      "attribute": "NAME_FIRST",
      "createdDate": "2020-01-01T10:05:59.5646+08:00",
      "dataPointId": "a9fcbf23-852f-441e-b729-dc9fffa528f7",
      "modifiedDate": "2020-01-01T10:06:32.4426+08:00",
      "regulations": ["SAMPLE_REGULATION"],
      "sensitivity": "PERSONAL",
      "reportOnly": false,
      "structureRootId": null,
      "entityId": "001",
      "value": "123-456-789"
    }
  ]
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|400|Encoded key provided is invalid|The public encryption key provided is not correct.|
|400|No such attribute|You are attempting to store data for an attribute that does not exist.|
|400|No such regulation|You are attempting to store data that is tagged with a regulation that does not exist.|
|400|Entity is of type \[entityType\], which does not match the provided entity type|The storage request specifies an entity type to create, but the entity that data is being stored for already exists and is of a different type|
|400|Attribute is not applicable to entity type|You are attempting to store data of an attribute that is not applicable to the entity type of the entity the data belongs to|
|403|Forbidden access to attribute|Your application does not have permission to access some of the attributes of the data you are attempting to store.|
|403|Cannot overwrite attribute for data subject, as the data subject is under a legal hold|You are attempting to store a value of a nonrepeatable attribute for a data subject who already has a value for that attribute, which would overwrite the existing value; however, the data subject is under a legal hold, and so the existing data cannot be overwritten|
|409|Received multiple values for nonrepeatable attribute|You are attempting to store two or more attributes belonging to the same attribute definition, but that attribute definition is not repeatable.|
|413|Datapoint values may not exceed 1 MB in size|You are attempting to store a string that is longer than 1,048,576 characters long. For longer data, set the data's [attribute schema](/tutorials/attribute-schemas) to "file".
|422|Expected \[type\] for value of attribute \[attribute\]|The value given for the indicated attribute or sub-attribute does not match what is expected according to that attribute's [schema](/tutorials/attribute-schemas).|
|400|Unknown sub-attribute \[sub-attribute\]|A value given for a structured attribute contains a sub-attribute that is not present in that attribute's [schema](/tutorials/attribute-schemas).|

## GET /entities/{entityId}/attributes/{attributeKey}

Displays information about an attribute for one entity

### Header Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|X-Decryption-Key|String                         |Private decryption key       |

### Path Variables
|Name               |Type                          |Description      |
|-------------------|------------------------------|-----------------|
|entityId           |String                        |Entity Identifier|
|attributeKey       |String                        |Attribute Name   |

### Example Response
```json
{
  "data": [
    {
      "attribute": "NAME_FIRST",
      "createdDate": "2020-01-01T10:05:59.5646+08:00",
      "dataPointId": "a9fcbf23-852f-441e-b729-dc9fffa528f7",
      "modifiedDate": "2020-01-01T10:06:32.4426+08:00",
      "regulations": ["SAMPLE_REGULATION"],
      "sensitivity": "PERSONAL",
      "reportOnly": false,
      "structureRootId": null,
      "entityId": "001",
      "value": "123-456-789"
    }
  ]
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|400|Encoded key provided is invalid|The private decryption key provided is not correct.|
|403|Forbidden|You are trying to access attributes that your application does not have access to.|
|404|Data Not Found|The specified entity does not exist, or else that entity has no value for the attributes specified.|

## GET /entities/{entityId}/attributes
Retrieves attributes for the given entity. By default, returns all attributes that your application has access to; alternatively, a list of desired attributes can be specified.

### Header Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|X-Decryption-Key|String                         |Private decryption key       |

### Path Variables
|Name               |Type                          |Description      |
|-------------------|------------------------------|-----------------|
|entityId           |String                        |Entity Identifier|

### Query Parameter Variables
|Name               |Type                          |Description      |
|-------------------|------------------------------|-----------------|
|attributes         |Array<String>                 |Comma-delimited list of attribute keys to access (optional)|

### Example Response
```json
{
  "data": [
    {
      "attribute": "NAME_FIRST",
      "createdDate": "2020-01-01T10:05:59.5646+08:00",
      "dataPointId": "a9fcbf23-852f-441e-b729-dc9fffa528f7",
      "modifiedDate": "2020-01-01T10:06:32.4426+08:00",
      "regulations": ["SAMPLE_REGULATION"],
      "sensitivity": "PERSONAL",
      "reportOnly": false,
      "structureRootId": null,
      "entityId": "001",
      "value": "123-456-789"
    }
  ]
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|400|Encoded key provided is invalid|The private decryption key provided is not correct.|
|403|Forbidden|You are trying to access attributes that your application does not have access to.|
|404|Data Not Found|The specified entity does not exist, or else that entity has no value for the attributes specified.|


## DELETE /entities/{entityId}/attributes/{attributeKey}
Deletes attributes for the given entity and attribute.

### Path Variables
|Name          |Type                          |Description      |
|--------------|------------------------------|-----------------|
|entityId      |String                        |Entity Identifier|
|attributeKey  |String                        |Attribute Key    |

### Example Response
```json
{
  "data": "Successfully Deleted Data Point"
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|403|Forbidden|You are trying to delete data from an attribute your application does not have access to.|
|404|Data Not Found|There is no data in the system with the specified entity ID and attribute.|

## GET /data/{dataPointId}
Retrieves data with the given datapoint id

### Header Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|X-Decryption-Key|String                         |Private decryption key       |

### Path Variables
|Name               |Type                          |Description      |
|-------------------|------------------------------|-----------------|
|dataPointId        |String                        |Datapoint ID     |

### Example Response
```json
{
  "data": {
    "attribute": "NAME_FIRST",
    "createdDate": "2020-01-01T10:05:59.5646+08:00",
    "dataPointId": "a9fcbf23-852f-441e-b729-dc9fffa528f7",
    "modifiedDate": "2020-01-01T10:06:32.4426+08:00",
    "regulations": ["SAMPLE_REGULATION"],
    "sensitivity": "PERSONAL",
    "reportOnly": false,
    "structureRootId": null,
    "entityId": "001",
    "value": "123-456-789"
  }
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|400|Encoded key provided is invalid|The private decryption key provided is not correct.|
|403|Forbidden|Your application does not have access to the attribute of the data point you are trying to read.|
|404|Data Not Found|There is no data point in the system with the specified ID.|


## DELETE /data/{dataPointId}
Deletes data with the given datapoint id

### Path Variables
|Name               |Type                          |Description      |
|-------------------|------------------------------|-----------------|
|dataPointId        |String                        |Datapoint ID     |

### Example Response
```json
{
  "data": "Successfully Deleted Data Point"
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|403|Forbidden|Your application does not have access to the attribute of the data point you are trying to delete.|
|404|Data Not Found|There is no data point in the system with the specified ID.|

## DELETE /datasubjects/{entityId}/data
Deletes all data for the given data subject

### Path Variables
|Name          |Type                          |Description      |
|--------------|------------------------------|-----------------|
|entityId     |String                        |Data Subject Identifier  |

### Example Response
```json
{
  "data": "Successfully Deleted Data Subject"
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|404|Data Subject Not Found|There is no data subject in the system with the specified ID.|


## POST /datasubjects/{entityId}/attributes

See [POST /entities/{entityId}/attributes](#post-entities-entityid-attributes).

## GET /datasubjects/{entityId}/attributes/{attributeKey}

See [GET /entities/{entityId}/attributes/{attributeKey}](#get-entitiesentityidattributesattributekey).

## GET /datasubjects/{entityId}/attributes

See [GET /entities/{entityId}/attributes](#get-entitiesentityidattributes).

### Additional error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|400        |Entity is not a data subject|The entity with the specified ID is not a data subject.|

## DELETE /datasubjects/{entityId}/attributes/{attributeKey}

See [DELETE /entities/{entityId}/attributes/{attributeKey}](#delete-entitiesentityidattributesattributekey).

### Additional error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|400        |Entity is not of type datasubject|The entity with the specified ID is not a data subject.|

## DELETE /datasubjects/{entityId}/data

See [DELETE /entities/{entityId}/data](#delete-entitiesentityiddata}).

### Additional error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|400        |Entity is not of type datasubject|The entity with the specified ID is not a data subject.|


## POST /search
Searches data that matches specified criteria, using blind indexing to allow searching for values without decrypting data. For more information, [read about ViziVault search](/tutorials/search).

### Body Parameters (Required)
|Name                 |Type                           |Description                     |
|---------------------|-------------------------------|--------------------------------|
|request              |DataSearchRequest              |Parameters to search for        |


### Example Payload
```json
{
  "query": {
    "values": [
      {
        "attribute": "SAMPLE_ATTRIBUTE_1",
        "value": "Value of sample attribute 1"
      },
      {
        "attribute": "SAMPLE_ATTRIBUTE_2",
        "value": "Value of sample attribute 2"
      }
    ],
    "attributes": ["SAMPLE_ATTRIBUTE_3", "SAMPLE_ATTRIBUTE_4"],
    "regulations" : ["SAMPLE_REGULATION"],
    "sensitivity": "NORMAL",
    "entityId": ["001", "002", "003"],
    "country": "US",
    "minCreatedDate": "2020-01-01T10:06:32.4426+08:00",
    "maxCreatedDate": "2020-01-31T10:06:32.4426+08:00"
  },
  "page": 0,
  "count": 100
}
```

### Example Response
```json
{
  "data": [
    {
      "attribute": "SAMPLE_ATTRIBUTE_2",
      "createdDate": "2020-01-15T10:05:59.5646+08:00",
      "dataPointId": "a9fcbf23-852f-441e-b729-dc9fffa528f7",
      "modifiedDate": "2020-01-01T10:06:32.4426+08:00",
      "regulations": ["SAMPLE_REGULATION"],
      "sensitivity": "NORMAL",
      "reportOnly": false,
      "structureRootId": null,
      "entityId": "001",
    }
  ]
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|404|Data Not Found|No search results were found for the provided query.|
