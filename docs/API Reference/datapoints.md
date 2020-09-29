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
|payload         |Array<Object\>                 |List of Objects to be stored |


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
      "key": "FIRST_NAME",
      "modifiedDate": "2020-01-01T10:06:32.4426+08:00",
      "regulations": ["SAMPLE_REGULATION"],
      "sensitivity": "PERSONAL",
      "userId": "001",
      "value": "123-456-789"
    }
  ]
}
```

## POST /data
(NOT SUPPORTED)
Edits metadata for an existing data point

### Body Parameters (Required)
|Name                |Type                           |Description                     |
|--------------------|-------------------------------|--------------------------------|
|Data Point Metadata |<Object\>                      |Metadata of data point to edit  |


### Example Payload
```json
{
  "accessibility": "Read Only",
  "attribute": "SAMPLE_ATTRIBUTE",
  "namespace": "string",
  "origin": "string",
  "regulations": "MY_REGULATION",
  "sensitivity": "PERSONAL",
  "userId": "string"
}
```

### Example Response
```json
{
  "data": {
    "attribute": "NAME_FIRST",
    "createdDate": "2020-01-01T10:05:59.5646+08:00",
    "dataPointId": "a9fcbf23-852f-441e-b729-dc9fffa528f7",
    "dataSources": "MY_DATA_SOURCE",
    "key": "FIRST_NAME",
    "modifiedDate": "2020-01-01T10:06:32.4426+08:00",
    "regulations": "MY_REGULATION",
    "sensitivity": "PERSONAL",
    "structureRootId": "string",
    "userId": -1,
    "value": "Doug"
  }
}
```

## POST /data/search
(THIS DOCUMENTATION IS OBSOLETE)
Searches data that matches criteria

### Body Parameters (Required)
|Name                 |Type                           |Description                     |
|---------------------|-------------------------------|--------------------------------|
|StorageSearchRequest |<Object\>                      |Storage search request          |


### Example Payload
```json
{
  "query": "FIRST_NAME=='Vivian'"
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
      "dataSources": "MY_DATA_SOURCE",
      "key": "FIRST_NAME",
      "modifiedDate": "2020-01-01T10:06:32.4426+08:00",
      "regulations": "MY_REGULATION",
      "sensitivity": "PERSONAL",
      "structureRootId": "string",
      "userId": -1,
      "value": "Doug"
    }
  ]
}
```

## POST /data/dataList
Returns a list of encrypted values for the specified attributes

### Body Parameters (Required)
|Name                |Type                           |Description                             |
|--------------------|-------------------------------|----------------------------------------|
|payload             |DataPointExportDTO                      |Object containing specified attributes  |


### Example Payload
```json
{
  "attributes": [
    "SAMPLE_ATTRIBUTE"
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
      "key": "FIRST_NAME",
      "modifiedDate": "2020-01-01T10:06:32.4426+08:00",
      "regulations": ["SAMPLE_REGULATION"],
      "sensitivity": "PERSONAL",
      "structureRootId": null,
      "userId": "001",
      "value": "Doug"
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
|payload             |StorageRequest                      |Storage Request  |

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
      "key": "FIRST_NAME",
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
      "key": "FIRST_NAME",
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
    "key": "FIRST_NAME",
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
      "key": "FIRST_NAME",
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