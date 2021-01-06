# Attributes

<!---## POST /data
Stores data for multiple users simultaneously.

### Header Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|X-Encryption-Key|String                         |Public encryption key        |


### Body Parameters (Required)
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|payload         |Array<[StorageRequest](/glossary/storage-request)>|List of storage requests (i.e. lists of data points, each for one user) to be processed |


### Example Payload
```json
{
  "requests":  [
    {
      "data": [
        {
          "accessibility": "Read Only",
          "attribute": "SAMPLE_ATTRIBUTE",
          "regulations": ["SAMPLE_REGULATION"],
          "sensitivity": "PERSONAL",
          "value": "123-456-789"
        }
      ],
      "namespace": "Example_Namespace",
      "origin": "127.0.0.1",
      "userId": "001"
    }
  ]
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
      "userId": "001",
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
|403|Forbidden access to attribute|Your application does not have permission to access some of the attributes of the data you are attempting to store.|
|413|Datapoint values may not exceed 1 MB in size|You are attempting to store a string that is longer than 1,048,576 characters long. For longer data, set the data's [attribute schema](/tutorials/attribute-schemas) to "file".
|422|Expected \[type\] for value of attribute \[attribute\]|The value given for the indicated attribute or sub-attribute does not match what is expected according to that attribute's [schema](/tutorials/attribute-schemas).|
|422|Unknown sub-attribute \[sub-attribute\]|A value given for a structured attribute contains a sub-attribute that is not present in that attribute's [schema](/tutorials/attribute-schemas).|-->

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
    "userId": ["001", "002", "003"],
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
      "userId": "001",
    }
  ]
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|404|Data Not Found|No search results were found for the provided query.|

## POST /users/{userId}/attributes
Stores attributes for the given user

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
|userId             |String                        |User Identifier  |


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
      "userId": "001",
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
|403|Forbidden access to attribute|Your application does not have permission to access some of the attributes of the data you are attempting to store.|
|413|Datapoint values may not exceed 1 MB in size|You are attempting to store a string that is longer than 1,048,576 characters long. For longer data, set the data's [attribute schema](/tutorials/attribute-schemas) to "file".
|422|Expected \[type\] for value of attribute \[attribute\]|The value given for the indicated attribute or sub-attribute does not match what is expected according to that attribute's [schema](/tutorials/attribute-schemas).|
|422|Unknown sub-attribute \[sub-attribute\]|A value given for a structured attribute contains a sub-attribute that is not present in that attribute's [schema](/tutorials/attribute-schemas).|


## GET /users/{userId}/attributes
Retrieves attributes for the given user

### Header Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|X-Decryption-Key|String                         |Private decryption key       |

### Path Variables
|Name               |Type                          |Description      |
|-------------------|------------------------------|-----------------|
|userId             |String                        |User Identifier  |

### Query Parameter Variables
|Name               |Type                          |Description      |
|-------------------|------------------------------|-----------------|
|attributes         |Array<String>                 |Comma-delimited list of attribute keys to access|

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
      "userId": "001",
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
|404|User Data Not Found|The specified user does not exist, or else that user has no value for the attributes specified.|


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
    "userId": "001",
    "value": "123-456-789"
  }
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|400|Encoded key provided is invalid|The private decryption key provided is not correct.|
|403|Forbidden|Your application does not have access to the attribute of the data point you are trying to read.|
|404|User Data Not Found|There is no data point in the system with the specified ID.|

## DELETE /users/{userId}/attributes/{attributeKey}
Deletes attributes for the given user and attribute

### Path Variables
|Name          |Type                          |Description      |
|--------------|------------------------------|-----------------|
|userId        |String                        |User Identifier  |
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
|404|User Data Not Found|There is no data in the system with the specified user ID and attribute.|

## DELETE /users/{userId}/data
Deletes all data for the given user

### Path Variables
|Name          |Type                          |Description      |
|--------------|------------------------------|-----------------|
|userId        |String                        |User Identifier  |

### Example Response
```json
{
  "data": "Successfully Deleted User"
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|404|User Not Found|There is no user in the system with the specified ID.|
