# Rule

Rules allow you to specify custom behavior based on the data that is stored in your system. You can mark data points with tags and regulations, receive notifications about what is being stored, or prevent the data from being persisted in the vault.

## Definition

There are several forms of metadata associated with regulations, as follows:

|Name |Type |Description|
|-----|-----|-----------|
|key|String|A unique identifier for this rule.|
|name|String|A human-readable title for this rule.|
|type|String|Either "activity" or "data"; determines what context this rule is applicable in.|
|constraint|[Rule constraint](/tutorials/rules#json-format-of-constraints)|The criteria that determine what data this rule applies to.|
|action|[Rule action](/tutorials/rules#json-format-of-actions)|The action to take on data that meets the condition.|
|executionOrder|int|Optional. Determines when this rule should be executed relative to other rules of the same action type. Rules with lower numbers will be executed first.|
|createdDate|String|An ISO 8601 representation of the timestamp when the rule was created.|
|modifiedDate|String|An ISO 8601 representation of the timestamp when the rule was most recently modified.|

## Examples

An example rule that marks data as governed by the Children's Online Privacy Protection Act (COPPA):

```json
{
  "key" : "TagCoppa",
  "name" : "COPPA tagging rule",
  "type": "data",
  "constraint": {
    "type" : "all",
    "value" : [
      {
        "type" : "user",
        "value" : {
          "attribute" : "AGE_YEARS",
          "predicate" : "lt",
          "value" : 13
        }
      },
      {
        "type" : "user",
        "value" : {
          "attribute" : "COUNTRY_OF_RESIDENCE",
          "predicate" : "eq",
          "value" : "US"
        }
      }
    ]
  },
  "action": {
    "type": "regulation",
    "regulation": "COPPA"
  },
  "executionOrder": 0,
  "createdDate" : "2020-01-01T02:18:54Z",
  "modifiedDate" : "2020-01-01T02:18:54Z"
}
```

