# Datapoints

## POST /data/bulk
Stores data for multiple users simultaneously.

### Header Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|X-Encryption-Key|String                         |Public encryption key        |


### Body Parameters (Required)
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|payload         |List of [StorageRequest](/glossary/storage-request)s|List of storage requests (i.e. lists of data points, each for one user) to be processed |


### Example Payload
```json
{
  "requests":  [
    {
      "dataPoints": [
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
      "userId": "001",
      "value": "123-456-789"
    }
  ]
}
```

## POST /data/search
Searches data that matches specified criteria, using blind indexing to allow searching for values without decrypting data. For more information, [read about ViziVault search](/tutorials/search.md).

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
      "structureRootId": null,
      "userId": "001",
    }
  ]
}
```

## POST /data/user/{userId}
Stores datapoints for the given user

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
  "dataPoints": [
    {
      "accessibility": "Read Only",
      "attribute": "SAMPLE_ATTRIBUTE",
      "dataPointId": "string",
      "regulations": ["SAMPLE_REGULATION"],
      "sensitivity": "PERSONAL",
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
      "structureRootId": "string",
      "userId": "001",
      "value": "123-456-789"
    }
  ]
}
```

## GET /data/user/{userId}
Retrieves datapoints for the given user

### Header Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|X-Decryption-Key|String                         |Private decryption key       |

### Path Variables
|Name               |Type                          |Description      |
|-------------------|------------------------------|-----------------|
|userId             |String                        |User Identifier  |

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
      "structureRootId": "string",
      "userId": "001",
      "value": "123-456-789"
    }
  ]
}
```

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
    "structureRootId": "string",
    "userId": "001",
    "value": "123-456-789"
  }
}
```

## GET /data/users
Retrieves datapoints for every user

### Header Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|X-Decryption-Key|String                         |Private decryption key       |

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
      "structureRootId": "string",
      "userId": "001",
      "value": "123-456-789"
    }
  ]
}
```

## DELETE /data/user/{userId}/{attributeKey}
Deletes datapoints for the given user and attribute

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

## DELETE /data/user/{userId}
Deletes all datapoints for the given user

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
