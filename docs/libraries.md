# Libraries
Integrate into your Vault APIs using one of our official libraries.

We offer an official SDK for most languages widely used in the industry today and are actively maintained by our engineering team.

- Java
- Node.js
- Python
- C#
- PHP

Library not available for your desired language? Feel free to contribute to our [open source community](https://github.com/anontechnology)!

## How does the SDK work?

## Vault Setup

  ``` java
  String encryptionKey = System.getenv("ENCRYPTIONKEY");
  String decryptionKey = System.getenv("DECRYPTIONKEY");
  ViziVault vault = new ViziVault()
    .withBaseURL(url)
    .withClientId(clientId)
    .withAPIKey(apiKey)
    .withEncryptionKey(encryptionKey)
    .withDecryptionKey(decryptionKey)
    .build();
  ```

=== "Java"

    ``` java
    String encryptionKey = System.getenv("ENCRYPTIONKEY");
    String decryptionKey = System.getenv("DECRYPTIONKEY");
    ViziVault vault = new ViziVault()
      .withBaseURL(url)
      .withClientId(clientId)
      .withAPIKey(apiKey)
      .withEncryptionKey(encryptionKey)
      .withDecryptionKey(decryptionKey)
      .build();
    ```

=== "C#"

    ``` c#
    // Coming soon!
    ```

=== "Node.js"

    ``` javascript
    // Coming soon!
    ```

=== "Python"

    ``` python
    // Coming soon!
    ```

=== "PHP"

    ``` php
    // Coming soon!
    ```


----------------------------------------------------------------------
## Attributes

### Adding an Attribute to an Entity or User

[Attributes](/glossary/attribute) are stored as key/value pairs of strings. Both Users and Entities can have Attributes set to them. If there is an existing Attribute in the system with the key of the provided Attribute, that Attribute will be updated; otherwise, a new Attribute will be created.

=== "Java"

    ``` java
    // Adding an attribute to user
    User user = vault.findByUser("User1234");
    user.setAttribute("FIRST_NAME", "Jane");
    vault.save(user);

    // Adding an attribute to entity
    Entity entity = vault.findByUser("Client6789");
    entity.setAttribute("FULL_ADDRESS", "1 Hacker Way, Beverly Hills, CA 90210");
    vault.save(entity);
    ```

=== "C#"

    ``` c#
    // Coming soon!
    ```

=== "Node.js"

    ``` javascript
    // Coming soon!
    ```

=== "Node.js"

    ``` node.js
    // coming soon
    ```

=== "Python"

    ``` python
    // coming soon
    ```

=== "PHP"

    ``` python
    // coming soon
    ```

### Retrieving all Attributes of an Entity or User

Retrieves all [Attributes](/glossary/attribute) for the specified entity or user. Returns a list of Attribute objects.

=== "Java"

    ``` java
    // Retrieving all attributes for a user
    User user = vault.findByUser("User1234");
    List<Attribute> attributes = user.getAttributes();

    // Retrieving all attributes for an entity
    Entity entity = vault.findByEntity("Client6789");
    List<Attribute> attributes = entity.getAttributes();
    ```

=== "C#"

    ``` c#
    // Coming soon!
    ```

=== "Node.js"

    ``` javascript
    // Coming soon!
    ```

=== "Python"

    ``` python
    // Coming soon!
    ```

=== "PHP"

    ``` php
    // Coming soon!
    ```  

### Retrieving an Attribute of an Entity or User

Retrieves a single specified [Attribute](/glossary/attribute) for the specified entity or user. Returns a UserAttribute object from the User object, or returns a list of Attributes from the Entity object.

=== "Java"

    ``` java
    // Retrieving specific attribute for a user
    User user = vault.findByUser("User1234");
    UserAttribute attribute = user.getAttribute("FIRST_NAME");

    // Retrieving specific attribute for an entity
    Entity entity = vault.findByEntity("Client6789");
    List<Attribute> attributes = entity.getAttribute("FULL_ADDRESS");
    ```

=== "C#"

    ``` c#
    // Coming soon!
    ```

=== "Node.js"

    ``` javascript
    // Coming soon!
    ```

=== "Python"

    ``` python
    // Coming soon!
    ```

=== "PHP"

    ``` php
    // Coming soon!
    ```  

### Searching

To search a Vault for [Attributes](/glossary/attribute), pass in a SearchRequest. A list of matching Attributes will be returned. For more information, [read about ViziVault search](/tutorials/search). 

=== "Java"

    ``` java
    List<Attribute> attributes = vault.search(new SearchRequest("LAST_NAME", "Doe"));
    ```

=== "C#"

    ``` c#
    // Coming soon!
    ```

=== "Node.js"

    ``` javascript
    // Coming soon!
    ```

=== "Python"

    ``` python
    // Coming soon!
    ```

=== "PHP"

    ``` php
    // Coming soon!
    ```  
  

### Deleting User Attributes

[Attributes](/glossary/attribute) can be removed from the User object by calling `remove` with the specified Attribute key, or by calling `purge` to remove all.

=== "Java"

    ``` java
    // Purging all user attributes
    User user = vault.findByUser("User1234");
    user.purge();

    // Removing specific attribute
    User user = vault.findByUser("User1234");
    user.remove("LAST_NAME");
    ```

=== "C#"

    ``` c#
    // Coming soon!
    ```

=== "Node.js"

    ``` javascript
    // Coming soon!
    ```

=== "Python"

    ``` python
    // Coming soon!
    ```

=== "PHP"

    ``` php
    // Coming soon!
    ```  
  
----------------------------------------------------------------------
## Attribute Definitions

### Storing an Attribute Definition in the Vault

To store an Attribute Definition, create one and save it to the Vault. The following code details the various properties of the AttributeDefinition object.

=== "Java"

    ``` java
    AttributeDefinition attribute = new AttributeDefinition();
    attribute.setName("Billing Address");
    attribute.setCategories(["geographic_location", "financial"]);
    attribute.setHint("{ line_one: \"1 Hacker Way\", line_two: \"Apt. 53\", 
                        city: \"Menlo Park\", state: \"California\", 
                        postal_code: \"94025-1456\", country: \"USA\"
                      }");
    attribute.setSchema(gson.toJson({ 
                        "line_one": "string",
                        "line_two": "string",
                        "city": "string",
                        "state": "string",
                        "postal_code": "string",
                        "country": "string"
                      });
    attribute.setRepeatable(false);
    attribute.setImmutable(false);
    attribute.setMandatory(true);
    attribute.setIndexed(false);
    attribute.setRegulations(["GDPR", "CCPA"]);

    vault.storeAttribute(attribute);
    ```

=== "C#"

    ``` c#
    // Coming soon!
    ```

=== "Node.js"

    ``` javascript
    // Coming soon!
    ```

=== "Python"

    ``` python
    // Coming soon!
    ```

=== "PHP"

    ``` php
    // Coming soon!
    ```  
  

### Retrieving Attribute Definitions from the Vault

Attribute Definitions can be retrieved from the Vault in bulk or by specifying the Attribute key.


=== "Java"

    ``` java
    // Retrieving all attributes
    List<AttributeDefinition> attributes = vault.getAttributeDefinitions();

    // Retrieving specific attribute
    AttributeDefinition attribute = vault.getAttributeDefinition("Billing Address");
    ```

=== "C#"

    ``` c#
    // Coming soon!
    ```

=== "Node.js"

    ``` javascript
    // Coming soon!
    ```

=== "Python"

    ``` python
    // Coming soon!
    ```

=== "PHP"

    ``` php
    // Coming soon!
    ```  
  

----------------------------------------------------------------------
## Tags

### Storing a Tag in the Vault

To store a new Tag, create a Tag object and save it to the Vault.


=== "Java"

    ``` java
    Tag tag = vault.save(new Tag("Financial Data"));
    ```

=== "C#"

    ``` c#
    // Coming soon!
    ```

=== "Node.js"

    ``` javascript
    // Coming soon!
    ```

=== "Python"

    ``` python
    // Coming soon!
    ```

=== "PHP"

    ``` php
    // Coming soon!
    ```  
  

### Retrieving Attributes from the Vault

Tags can be retrieved as a list of Tag objects or as a single Tag if the specific Tag is specified.

=== "Java"

    ``` java
    // Retrieving all tags
    List<Tag> tags = vault.getTags();

    // Retrieving specific tag
    String tag = vault.getTag("Financial Data");
    ```

=== "C#"

    ``` c#
    // Coming soon!
    ```

=== "Node.js"

    ``` javascript
    // Coming soon!
    ```

=== "Python"

    ``` python
    // Coming soon!
    ```

=== "PHP"

    ``` php
    // Coming soon!
    ```  
  

### Deleting Tags from the Vault

To remove a Tag, specify the Tag to be removed. A Boolean denoting the status of the operation will be returned.

=== "Java"

    ``` java
    // Removing a specific tag
    Boolean bool = vault.removeTag("Financial Data");
    ```

=== "C#"

    ``` c#
    // Coming soon!
    ```

=== "Node.js"

    ``` javascript
    // Coming soon!
    ```

=== "Python"

    ``` python
    // Coming soon!
    ```

=== "PHP"

    ``` php
    // Coming soon!
    ```  
 

----------------------------------------------------------------------
## Regulations

### Storing a Regulation in the Vault

To store a [Regulation](/glossary/regulation) to the Vault, create a new Regulation object and save it to the Vault. The constructor takes the `key`, `name`, and `url` of the Regulation.

=== "Java"

    ``` java
    // Storing a regulation
    Regulation regulation = new Regulation("GDPR", 
                                          "General Data Protection Regulation",
                                          "https://gdpr.eu/" 
                                          );
    Regulation savedRegulation = vault.save(regulation);
    ```

=== "C#"

    ``` c#
    // Coming soon!
    ```

=== "Node.js"

    ``` javascript
    // Coming soon!
    ```

=== "Python"

    ``` python
    // Coming soon!
    ```

=== "PHP"

    ``` php
    // Coming soon!
    ```  
 

### Retrieving Regulations from the Vault

[Regulations](/glossary/regulation) can be retrieved as a list of Regulation objects or as a single Regulation if the specific Regulation is specified.

=== "Java"

    ``` java
    // Retrieving all regulations
    List<Regulation> regulations = vault.getRegulations();

    // Retrieving specific regulation
    Regulation regulation = vault.getRegulation("GDPR");
    ```

=== "C#"

    ``` c#
    // Coming soon!
    ```

=== "Node.js"

    ``` javascript
    // Coming soon!
    ```

=== "Python"

    ``` python
    // Coming soon!
    ```

=== "PHP"

    ``` php
    // Coming soon!
    ```  
 

### Deleting Regulations from the Vault

To remove a [Regulation](/glossary/regulation), specify the Regulation to be removed. A Boolean denoting the status of the operation will be returned.

=== "Java"

    ``` java
    // Removing a specific regulation
    Boolean bool = vault.removeRegulation("GDPR");
    ```

=== "C#"

    ``` c#
    // Coming soon!
    ```

=== "Node.js"

    ``` javascript
    // Coming soon!
    ```

=== "Python"

    ``` python
    // Coming soon!
    ```

=== "PHP"

    ``` php
    // Coming soon!
    ```  
 
