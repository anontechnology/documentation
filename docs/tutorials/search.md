# Search
## Overview
In order to allow users of the ViziVault system to search on data without opening up the possibility of data breaches, ViziVault supports blind indexing for selected attributes. What this means is that, whenever a datapoint is stored that belongs to an indexable attribute, a secure hash is calculated for the datapoint value. When a user wants to search for a data value in the vault, the value they enter is hashed in the same way, and compared against the stored hash of data that is in the vault. In this way, it is possible to identify whether one specific value exists in the vault, without leaking any information about what else is in the vault.

Of course, this behavior is not desirable for all attributes, which is why it is possible to specify at the attribute level what data should be indexed. This allows analytics such as "what is the ratio of male to female customers" to be calculated, while making it impossible to search for a user by their social security number; in order to do this, all that is necessary is for gender to be an indexed attribute but not social security number. If an indexed attribute contains structured data by means of an attribute schema, each sub-attribute is indexed separately, allowing greater flexibility in how search can be used.

## Technical Details

The search system can be accessed in two ways: through the ViziVault Enterprise front-end, and through the ViziVault API.

### Performing a search in the ViziVault Enterprise front-end
[TBD, waiting on frontend mockup - but mention the async nature of this and the notifications involved]

### Performing a search using the ViziVault API
To perform a search request using the ViziVault API, send a HTTP POST request to `/data/search`. The body of the request should be a JSON object formatted as follows:
```json
{
    "page": <integer>,
    "count": <integer>,
    "query": {
        "values": [
            {
                "attribute": <attribute key>,
                "value": <string>
            }
        ],
        "attributes": [ <string> ],
        
        "regulations": [ <string> ],
        "sensitivity": <one of "SENSITIVE", "PERSONAL", "CONFIDENTIAL", or "NORMAL">,
        "userId": [ <string> ],

        "country": <string>,

        "minCreatedDate": <date>,
        "maxCreatedDate": <date>
    }
}
```
This query will return all data points in the vault that either belong to an attribute listed in `attributes`, or match an attribute-value pair as specified in `values`. The rest of the parameters can be used to further filter what data is returned, and the `page` and `count` parameters are used for pagination. **`values`, `page`, and `count` are mandatory. All other parameters are optional.** More details for each parameter are as follows:

 - `values`: This is a list of attribute-value pairs. This will match any datapoint in the vault that belongs to the specified attribute and has the specified value, so long as the attribute in question is indexable. If a non-indexable attribute is specified here, that attribute-value pair will be ignored.
 - `attributes`: This is a list of attributes. This will match any datapoint in the vault that belongs to a specified attribute, regardless of whether it is indexable.
 - `regulations`: This is a list of regulations. It will filter the search results to only include data points tagged with one or more of the regulations specified. Including an empty string in this list will match data points that are not tagged with any regulations.
 - `userid`: This is a list of IDs of users in the vault. It will filter the search results to only include data points belonging to those users.
 - `country`: This is an ISO 3166 country code, such as "US" or "GB". It will filter the search results to only include data points collected from that country.
 - `minCreatedDate`, `maxCreatedDate`: These are timestamps formatted according to ISO 8601. They will filter data points based on when those data points were entered into the system.

## Examples
To list all users whose job title is "Software Engineer":
```json
{
    "page": 0,
    "count": 100,
    "query": {
        "values": [
            {
                "attribute": "JOB_TITLE",
                "value": "Software Engineer"
            }
        ]
    }
}
```

