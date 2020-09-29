# Categories

## GET /categories
Retrieves data for all categories in the system. Returns a list of [Category](#somewhere) objects.

### Parameters
None

### Example response
```json
{
  "data": [
    {
      "key": "SAMPLE_CATEGORY",
      "name": "Sample Category",
      "createdDate": "2020-09-03T02:18:54Z",
      "modifiedDate": "2020-09-24T18:28:29Z"
    }
  ]
}
```

## POST /categories
Creates or edits an category. If there is an existing category in the system with the `key` of the provided category, that category will be updated; otherwise, a new category will be created.

### Parameters

#### Body Parameters (Required)
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|payload         |[CategoryDefinition](#somewhere)        |Description of new category |

### Example payload

```json
{
  "key": "SAMPLE_CATEGORY",
  "name": "Sample Category"
}
```

### Example response
On success, returns 201 Created and a description of the updated category.

```json
{
  "data": {
    "key": "SAMPLE_CATEGORY",
    "name": "Sample Category",
    "createdDate": "2020-09-03T02:18:54Z",
    "modifiedDate": "2020-09-24T18:28:29Z"
  }
}
```

## GET /categories/{category key}
Displays information about one category. Returns an [Category](#somewhere) object.

### Path Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|Category key|String                         |Key of the category to describe        |

### Example response
```json
{
  "data" : {
    "key": "SAMPLE_CATEGORY",
    "name": "Sample Category",
    "createdDate": "2020-09-03T02:18:54Z",
    "modifiedDate": "2020-09-24T18:28:29Z",
  }
}
```

