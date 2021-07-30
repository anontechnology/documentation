# Entity Attributes

## POST /entities/{entityId}/attributes
Stores attributes for the given entity

Identical to [POST /users/{userId}/attributes](/api/datapoints#post-usersuseridattributes), but stores data for entities rather than users.

## GET /entities/{entityId}/attributes/{attributeKey}
Displays information about an attribute for one entity.

Identical to [GET /users/{userId}/attributes/{attributeKey}](/api/datapoints#get-usersuseridattributesattributekey), but retrieves data for entities rather than users.

## GET /entities/{entityId}/attributes
Retrieves attributes for the given entity.

Identical to [GET /users/{userId}/attributes](/api/datapoints#get-usersuseridattributes), but retrieves data for entities rather than users.

## DELETE /entities/{entityId}/attributes/{attributeKey}
Deletes attributes for the given entity and attribute

Identical to [DELETE /users/{userId}/attributes/{attributeKey}](#delete-usersuseridattributesattributekey), but deletes data for entities rather than users.

## DELETE /entities/{entityId}/data
Stores attributes for the given entity

Identical to [DELETE /users/{userId}/data](#delete-usersuseriddata), but deletes data for entities rather than users.
