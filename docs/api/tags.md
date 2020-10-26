# Tags


## POST /tags
Creates or edits an tag. If there is an existing tag in the system with the `name` of the provided tag, that tag will be updated; otherwise, a new tag will be created.

### Parameters

#### Body Parameters (Required)
|Name            |Type                           |Description           |
|----------------|-------------------------------|----------------------|
|payload         |[Tag](/glossary/tag)           |Description of new tag|

### Example payload

```json
{
  "name": "SampleTag"
}
```

### Example response
On success, returns 201 Created and a description of the updated tag.

```json
{
  "data": {
    "name": "SampleTag",
    "createdDate": "2020-09-03T02:18:54Z",
    "modifiedDate": "2020-09-24T18:28:29Z"
  }
}
```


## GET /tags
Retrieves data for all tags in the system. Returns a list of [Tag](/glossary/tag) objects.

### Parameters
None

### Example response
```json
{
  "data": [
    {
      "name": "SampleTag1",
      "createdDate": "2020-09-03T02:18:54Z",
      "modifiedDate": "2020-09-24T18:28:29Z"
    },
    {
      "name": "SampleTag2",
      "createdDate": "2020-10-03T02:18:54Z",
      "modifiedDate": "2020-10-24T18:28:29Z"
    }
  ]
}
```

## GET /tags/{tagName}
Displays information about one tag. Returns an [Tag](/glossary/tag) object.

### Path Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|tagName         |String                         |Name of the tag to describe  |

### Example response
```json
{
  "data" : {
    "name": "SampleTag",
    "createdDate": "2020-09-03T02:18:54Z",
    "modifiedDate": "2020-09-24T18:28:29Z",
  }
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|404        |No such tag  |The system does not contain a tag with the specified name.|


## DELETE /tags/{tagName}
Deletes a tag from the system, and removes it from all datapoints, users, and attributes tagged with it.

### Path Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|tagName         |String                         |Name of the tag to describe|

### Example response
```json
{
  "data" : "Successfully deleted tag"
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|404        |No such tag  |The system does not contain a tag with the specified name.|
