# Rules

## POST /rules
Creates or edits a rule. If there is an existing rule in the system with the `name` of the provided rule, that rule will be updated; otherwise, a new rule will be created.

### Parameters

#### Body Parameters (Required)
|Name            |Type                  |Description             |
|----------------|----------------------|------------------------|
|payload         |[Rule](/glossary/rule)|Description of new rule |

### Example payload
For more information on how to specify rules for rules, see [Rules](/tutorials/rules).

```json
{
  "name": "Sample rule",
  "key": "sampleRule"
  "type": "data",
  "constraint": {
    "type": "attribute",
    "operator": "any",
    "attributes": ["ATTRIBUTE_1", "ATTRIBUTE_2"]
  },
  "action": {
    "type": "alert",
    "alertLevel": "NORMAL",
    "message": "A data point was stored"
  }
}
```

### Example response
```json
{
  "data": "Rule created"
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|400        |Rule key is required|No unique identifier for the rule was specified.|
|400        |Cannot parse JSON of rule|The rule provided is not valid JSON.|
|400        |Rule constraint must be specified as an object|The rule's constraint is missing or invalid.|
|400        |Rule action must be specified as an object|The rule's action is missing or invalid.|
|400        |Constraint type must be specified as a string|The rule provided contains constraints that do not have a type or whose type is not specified as a string.|
|400        |\[Attribute / Tag / Regulation / Geolocation\] constraint operator must be specified as a string|A constraint was specified that is missing a list operator or whose list operator is not a string.|
|400        |Unsupported \[attribute / tag / regulation / geolocation\] list operator|An invalid operator was specified for a list constraint. Attribute, tag, regulation, and geolocation constraints all support the list operators "any" and "none"; tag and regulation constraints additionally support "all".|
|400        |Constraint \[attribute / tag / regulation\] list must be specified as an array|An attribute, tag, or regulation constraint was specified whose list was missing or not an array.|
|400        |Neither countries nor subdivisions specified for geolocation constraint|A geolocation constraint was specified with no countries and no subdivisions.|
|400        |Geolocation constraint \[country / subdivision\] list must be an array|A geolocation constraint was specified with a country list or subdivision list in an invalid format.|
|400        |Countries for geolocation constraint must be specified as ISO 3166-1 two-letter codes|A geolocation constraint was specified that contains an invalid country code. ISO 3166-1 country codes consist of two letters, case-insensitive.|
|400        |Subdivisions for geolocation constraint must be specified as ISO 3166-2 hyphenated codes|A geolocation constraint was specified that contains an invalid subdivision code. ISO 3166-2 hyphenated codes consist of a two-letter country code, followed by a hyphen, followed by a two- or three-letter subdivision code, such as `US-NY`.|
|400        |Entity value constraint attribute must be specified as a string|An entity value constraint was specified with a missing or invalid attribute.|
|422        |No such attribute|An attribute specified for an entity value constraint or an attribute list constraint does not exist.|
|422        |No such regulation|A regulation specified for a regulation list constraint does not exist.|
|400        |No value specified for entity value constraint|An entity value constraint was specified with a missing value.|
|400        |Entity-value attribute constraint predicate \[predicate\] is not supported.|An invalid predicate was specified for an entity value constraint. For more information on what predicates are valid, see [entity value attribute constraints](/tutorials/rules#entity-value-constraints).|
|400        |Unrecognized constraint type|An invalid constraint type was specified. For more information on what constraint types are valid, see [Rules](/tutorials/rules)|
|402        |Your current subscription does not support custom rules|Your current license tier has limited features, and custom rules are not included|


## GET /rules
Retrieves data for all rules in the system. Returns a list of [Rule](/glossary/rule) objects.

### Parameters
None

### Example response
```json
{
  "data" : [
    {
      "key": "sampleRule1",
      "name": "First Sample Rule",
      "type": "data",
      "constraint": {
          "type": "attribute",
          "operator": "any",
          "attributes": ["ATTRIBUTE_1", "ATTRIBUTE_2"]
      },
      "action": {
          "type": "alert",
          "alertLevel": "NORMAL",
          "message": "A data point was stored"
      },
      "executionOrder": 1,
      "createdDate": "2020-01-01T04:00:00Z",
      "modifiedDate": "2020-09-25T01:10:02Z"
    },
    {
      "key": "sampleRule2",
      "name": "Second Sample Rule",
      "type": "activity",
      "constraint": {
          "type": "eventType",
          "eventTypes": ["READ"]
      },
      "action": {
          "type": "alert",
          "alertLevel": "NORMAL",
          "message": "A data point was accessed"
      },
      "executionOrder": 1,
      "createdDate": "2020-01-01T04:00:00Z",
      "modifiedDate": "2020-09-25T01:10:02Z"
    }
  ]
}
```

## GET /rules/{ruleName}
Displays information about one rule. Returns a [Rule](/glossary/rule) object, or 404 Not Found if there is no rule with the specified name.

### Path Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|ruleName        |String                         |Name of the rule to describe |

### Example response
```json
{
  "data": {
    "key": "sampleRule",
    "name": "Sample rule",
    "type": "data",
    "constraint": {
        "type": "attribute",
        "operator": "any",
        "attributes": ["ATTRIBUTE_1", "ATTRIBUTE_2"]
    },
    "action": {
        "type": "alert",
        "alertLevel": "NORMAL",
        "message": "A data point was stored"
    },
    "executionOrder": 1,
    "createdDate": "2020-01-01T04:00:00Z",
    "modifiedDate": "2020-09-25T01:10:02Z"
  }
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|404        |Rule not found|The system does not contain a rule with the specified name.|

## DELETE /rules/{ruleName}
Deletes a specified rule, and untags it from all attributes. Returns 404 Not Found if there is no rule with the specified name.

### Path Parameters
|Name            |Type                           |Description                  |
|----------------|-------------------------------|-----------------------------|
|ruleName        |String                         |Name of the rule to delete   |

### Example response
```json
{
  "data": "Rule deleted"
}
```

### Error responses
|Status code|Error message|Description|
|-----------|-------------|-----------|
|404        |Rule not found|The system does not contain a rule with the specified name.|

