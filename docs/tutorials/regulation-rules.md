# Regulation Rules

ViziVault contains a flexible, powerful rules engine that allows specifying exactly what subsets of your data various governmental regulations such as GDPR or HIPAA apply to. This is accomplished by defining constraints, and tagging all data matching those constraints with the regulation. For more sophisticated or nuanced use cases, it is possible to combine multiple constraints together using boolean operators.

## Attribute list constraints

The simplest constraint is an attribute list constraint, which can mark a regulation as applying to either all attributes in a specified list, or all attributes that are not in that specified list. The attribute list constraint consists of a list of attribute keys, and an operator, which is either `any` (which will match data whose attribute is in the list) or `none` (which will match data whose attribute is not in the list).

## Category list constraints

Category list constraints are similar to attribute list constraints, in that they consist of a list of categories and an operator. However, since a data point can belong to multiple categories (but not multiple attributes), the operator `all` is also allowed; in this case, the constraint would only match data points whose attribute is tagged with all of the categories in the provided list.

## User attribute value constraints

User attribute constraints allow you to apply regulations to data based on things that are true about the user it belongs to, rather than just basing it off of the data point itself. A user attribute constraint consists of three parts: the attribute to consider, the value to compare the user's value of the attribute to, and the precise way the attribute values should be compared (referred to as the predicate).

The valid predicates are as follows:

 - `eq`: Matches users whose value of this attribute is exactly equal to the provided value.
 - `neq`: Matches users whose value of this attribute is anything other than the provided value.
 - `gt`: For numerical data; matches users whose value of this attribute is greater than the provided value.
 - `lt`: For numerical data; matches users whose value of this attribute is less than the provided value.
 - `geq`: For numerical data; matches users whose value of this attribute is greater than or equal to the provided value.
 - `leq`: For numerical data; matches users whose value of this attribute is less than or equal to the provided value.
 - `after`: For temporal data; matches users whose value of this attribute is a later time than the provided value.
 - `before`: For temporal data; matches users whose value of this attribute is an earlier time than the provided value.
 - `any`: Treats the value as a comma-delimited list of strings and matches users whose value of this attribute appears in the provided list.
 - `none`: Treats the value as a comma-delimited list of strings and matches users whose value of this attribute does not appear in the provided list.

## Conjunctive ("all") constraints

Conjunctive constraints allow you to further constrain what data is matched. They consist of a list of other constraints, and will match data that is matched by all of the constituent constraints.

## Disjunctive ("any") constraints

Conjunctive constraints allow you to broaden what data is matched. They consist of a list of other constraints, and will match data that is matched by any of the constituent constraints.

## JSON format of rules

Rules are expressed as a JSON object, structured as described below:

 - Root node: an object that must contain a `constraint` field and exactly one other of the following fields
    - `type` : one of `all`, `any`, `category`, `attribute`, or `user`
    - `value`: depends on the value of `type`
    - `all` : list of root nodes
    - `any` : list of root nodes
    - `category` : category constraint object
    - `attribute` : attribute constraint object
    - `user` : user constraint object
 - Category constraint object:
    - `operator` : either `any`, `all`, or `none`
    - `categories` : list of category keys (strings)
 - Attribute constraint object:
    - `operator` : either `any` or `none`
    - `attributes` : list of attribute keys (strings)
 - User constraint object:
    - `attribute` : attribute key (string)
    - `predicate` : one of `eq`, `neq`, `gt`, `lt`, `geq`, `leq`, `before`, `after`, `any`, `none`
    - `value` :
        - When predicate is `eq` or `neq`, any number or string.
        - When predicate is `gt`, `lt`, `geq`, or `leq`, any number.
        - When predicate is `before` or `after`, a string representing a point in time.
        - When predicate is `any` or `none`, a list of strings.

## Examples

An example representation of the Children's Online Privacy Protection Act (COPPA), which applies to personal information about Americans under the age of 13. It consists of a conjunctive constraint that combines two user attribute value constraints; one of the user constraints matches users whose age is less than 13, and the other matches users who live in the United States.

```json
{
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
}
```