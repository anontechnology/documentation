# Rules

ViziVault contains a flexible and powerful rules engine that can automate tasks on incoming data. When data is stored in your system, you can configure rules that will check the data against configurable constraints and perform various actions based on which predicates match. This can add metadata taggings, such as marking the data with what regulations govern its use (such as GDPR or HIPAA), send notifications to you, or prevent the data from being stored entirely.

There are four parts to every rule: a name, a constraint that determines when the rule should be active, an action to take when the rule is active, and optionally an execution order that specifies when this rule should be run relative to other rules.

# Constraints

## Attribute list constraints

The simplest constraint is an attribute list constraint, which can mark a rule as applying to either all attributes in a specified list, or all attributes that are not in that specified list. The attribute list constraint consists of a list of attribute keys, and an operator, which is either `any` (which will match data whose attribute is in the list) or `none` (which will match data whose attribute is not in the list).

## Tag list constraints

Tag list constraints are similar to attribute list constraints, in that they consist of a list of tags and an operator. However, since a data point can have multiple tags (but not belong to multiple attributes), the operator `all` is also allowed; in this case, the constraint would only match data points whose attribute is tagged with all of the tags in the provided list.

## Regulation list constraints

Regulation constraints are much the same as attribute list constraints and tag list constraints, consisting of an operator which is `any` or `all` or `none` and a list of regulations.

## Geographic constraints

Geographic constraints match incoming data based on the data's geographic location. Note that geolocation data is based on the IP address of the HTTP request storing the data; if there are proxy servers involved, this constraint may not always be fully accurate.

A geographic constraint consists of an operator (either `any` or `none`), a list of countries, and a list of subdivisions. Countries are represented using ISO 3166-1 two-letter codes, and subdivisions are represented using ISO 3166-2 hyphenated codes.

## Data subject value constraints

Data subject value constraints allow you to activate rules based on things that are true about the data subject whom the data belongs to, rather than just basing it off of the data point itself. A data subject value constraint consists of three parts: the attribute to consider, the value to compare the data subject's value of the attribute to, and the precise way the attribute values should be compared (referred to as the predicate).

The valid predicates are as follows:

 - `eq`: Matches entities whose value of this attribute is exactly equal to the provided value.
 - `neq`: Matches entities whose value of this attribute is anything other than the provided value.
 - `gt`: For numerical data; matches entities whose value of this attribute is greater than the provided value.
 - `lt`: For numerical data; matches entities whose value of this attribute is less than the provided value.
 - `geq`: For numerical data; matches entities whose value of this attribute is greater than or equal to the provided value.
 - `leq`: For numerical data; matches entities whose value of this attribute is less than or equal to the provided value.
 - `after`: For temporal data; matches entities whose value of this attribute is a later time than the provided value.
 - `before`: For temporal data; matches entities whose value of this attribute is an earlier time than the provided value.
 - `in`: Treats the value as a comma-delimited list of strings and matches entities whose value of this attribute appears in the provided list.
 - `nin`: Treats the value as a comma-delimited list of strings and matches entities whose value of this attribute does not appear in the provided list.
 - `regex`: Treats the value as a regular expression and matches entities whose value of this attribute is a string that matches the provided regular expression.

## Sentiment constraints

For data whose value is natural-language text, the sentiment constraint uses IBM's Watson system to perform sentiment analysis on the data value. Watson detects the overall sentiment of text, as well as the sentiment that the text expresses towards specific topics. This constraint will match data if the overall detected sentiment is more extreme than the threshold (that is, greater than a positive threshold, or less than a negative one), or if sentiment exceeding the threshold is detected towards any keywords.

## Conjunctive ("all") constraints

Conjunctive constraints allow you to further constrain what data is matched. They consist of a list of other constraints, and will match data that is matched by all of the constituent constraints.

## Disjunctive ("any") constraints

Disjunctive constraints allow you to broaden what data is matched. They consist of a list of other constraints, and will match data that is matched by any of the constituent constraints.

## JSON format of constraints

Constraints are expressed as a JSON object, structured as described below. The value of the rule's `type` field determines the rest of its structure.

 - Conjunctive constraint
    - `type` : the string `"all"`
    - `constraints` : a list of rule objects
 - Disjunctive constraint
    - `type` : the string `"any"`
    - `constraints` : a list of rule objects
 - Tag constraint
    - `type` : the string `"tag"`
    - `operator` : either `any`, `all`, or `none`
    - `tags` : list of tag names (strings)
 - Regulation constraint
    - `type` : the string `"regulation"`
    - `operator` : either `any`, `all`, or `none`
    - `regulations` : List of regulation keys (strings)
 - Attribute constraint
    - `type` : the string `"attribute"`
    - `operator` : either `any` or `none`
    - `attributes` : list of attribute keys (strings)
 - Geographic constraint
    - `type` : the string `"geo"`
    - `operator` : either `any` or `none`
    - `countries` : list of ISO 3166-1 country codes, as strings
    - `subdivisions` : list of ISO 3166-2 country subdivision codes, as strings
 - User-attribute-value constraint
    - `type` : the string `"user"`
    - `attribute` : attribute key (string)
    - `predicate` : one of `eq`, `neq`, `gt`, `lt`, `geq`, `leq`, `before`, `after`, `in`, `nin`,
    - `value` :
        - When predicate is `eq` or `neq`, any number or string.
        - When predicate is `gt`, `lt`, `geq`, or `leq`, any number.
        - When predicate is `before` or `after`, a string representing a point in time.
        - When predicate is `in` or `nin`, a string consisting of values separated by commas.
        - When predicate is `regex`, a valid regular expression.
 - Sentiment constraint
    - `type` : the string `sentiment
    - `threshold` : a floating-point number between -1 and 1

# Actions

## Regulation metadata action

A regulation metadata action tags data with a regulation. (In previous versions of ViziVault, all rules used regulation metadata actions.) This can be used for various business logic, for analytics in the ViziVault Enterprise frontend, and to trigger other rules.

## Tag metadata action

A tag metadata action adds a tag to data in the same way a regulation metadata action adds a regulation. Like a regulation metadata action, this can be used for internal business logic or to trigger other rules.

## Storage prevention action

A storage prevention action causes the system to reject data, preventing it from being stored in the system. This is often useful for regulatory compliance. This allows configuring a custom message to display to clients when their data is rejected.

## Notification action

A notification action dispatches a notification to the ViziVault enterprise web interface. The text of the notification and its alert level can be configured.

## Legal hold action

A legal hold action places a legal hold on the [data subject](/glossary/datasubject) that the data is associated with. This prevents potentially destructive actions such as deleting or overwriting data until the hold is lifted.

## Retention policy action

A retention policy action determines how long the data is considered to still be valid. The retention policy status of all your data can be viewed in ViziVault Enterprise. Retention policies can specify either a cutoff date after which the data is no longer valid, or a number of days to retain the data for. Additionally, a secondary policy can be specified that marks data as invalid if it has not been read for a certain number of days.

## JSON format of actions

 - Regulation metadata action
   - `type`: the string `"regulation"`
   - `regulation`: a regulation key (string)
 - Tag metadata action
   - `type`: the string `"tag"`
   - `tag`: a tag (string)
 - Storage prevention action
   - `type`: the string `"block"`
   - `message`: a human-readable explantion of why the storage was disallowed
 - Notification action
   - `type`: the string `"alert"`
   - `alertLevel`: one of `INFO`, `WARNING`, `DANGER`, `SUCCESS`, or `NEUTRAL`
   - `message`: the text to display in the notification
 - Legal hold action
   - `type`: the string `"legalHold"`
 - Retention policy action
   - `type`: the string `"retention"`
   - `expirationDate`: an ISO-formatted date string indicating when this data expires (optional; mutually exclusive with `daysSinceStore`)
   - `daysSinceStore`: an integer indicating how many days to retain this data for (optional; mutually exclusive with `daysSinceStore`)
   - `daysSinceRead`: an integer indicating that the data will become invalid if it has not been read during this many days (optional)

# Execution order

Because rules can modify tags and regulations but can also depend on tags and regulations, it may be necessary to specify an order in which they are executed. Because of this, rules can optionally have an execution order specified. Rules that have the same type of action will be executed in order from lowest to highest specified order. When two or more rules have the same execution order, there is no guarantee what order they will be executed in, although it will usually default to the order they were created. For this reason, it is recommended that if one rule modifies a tag or regulation that another rule depends on, the two rules should have different execution orders.

Some rules by their nature cannot affect further rules. For this reason, rules are executed as follows: first, all rules that add tags in order, then all rules that add regulations in order, then all rules that send notifications, then all rules that block storage.
