# DataPoints

## POST /data/bulk
This is to store many data points at once

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
          "classification": "NAME_FIRST",
          "regulations": "MY_REGULATION",
          "sensitivity": "PERSONAL",
          "value": "123-456-789"
        }
      ],
      "namespace": "Example_Namespace",
      "origin": "127.0.0.1",
      "userId": -1
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
      "dataSources": "MY_DATA_SOURCE",
      "derivedFrom": "string",
      "key": "FIRST_NAME",
      "modifiedDate": "2020-01-01T10:06:32.4426+08:00",           
      "regulations": "MY_REGULATION",
      "sensitivity": "PERSONAL",
      "userId": -1,
      "value": "Doug"
    }
  ]
}
```

