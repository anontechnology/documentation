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

### Vault Setup

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

----------------------------------------------------------------------
### Storing and Retrieving Data

  ``` java

  // Adding data to user
  User user = vault.findByUser("User1234");
  user.setAttribute("FIRST_NAME", "Jane");
  vault.save(user);

  // Adding data to entity
  Entity entity = vault.findByUser("Client6789");
  entity.setAttribute("FULL_ADDRESS", "1 Hacker Way, Beverly Hills, CA 90210");
  vault.save(entity);

  // Retrieving all data for user
  User user = vault.findByUser("User1234");
  List<Attribute> attributes = user.getAttributes();

  // Retrieving all data for entity
  Entity entity = vault.findByEntity("Client6789");
  List<Attribute> attributes = entity.getAttributes();

  // Retrieving specific data for user
  User user = vault.findByUser("User1234");
  UserAttribute attribute = user.getAttribute("FIRST_NAME");

  // Retrieving specific data for entity
  Entity entity = vault.findByEntity("Client6789");
  List<Attribute> attributes = entity.getAttribute("FULL_ADDRESS");

  // Searching
  List<Attribute> attributes = vault.search("LAST_NAME == 'DOE'");

  // Purging all user data
  User user = vault.findByUser("User1234");
  user.purge();

  // Removing specific data
  User user = vault.findByUser("User1234");
  user.remove("LAST_NAME");
  ```

----------------------------------------------------------------------
### Storing and Retrieving Attibute Definitions

  ``` java
  // Store an attribute
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
  attribute.setRepeatable(false); // Keith + Andrew to deep dive later
  attribute.setImmutable(false);
  attribute.setMandatory(true);
  attribute.setIndexed(false);
  attribute.setRegulations(["GDPR", "CCPA"]);

  vault.storeAttribute(attribute);

  // Retrieving all attributes
  List<AttributeDefinition> attributes = vault.getAttributeDefinitions();

  // Retrieving specific attribute
  AttributeDefinition attribute = vault.getAttributeDefinition("Billing Address");
  ```

----------------------------------------------------------------------
### Storing and Retrieving Tags

  ``` java
  // Storing a tag
  Tag tag = vault.save(new Tag("Financial Data"));

  // Retrieving all tags
  List<Tag> tags = vault.getTags();

  // Retrieving specific tag
  String tag = vault.getTag("Financial Data");

  // Removing a specific tag
  Boolean bool = vault.removeTag("Financial Data");
  ```

----------------------------------------------------------------------
### Storing and Retrieving Regulations

  ``` java
  // Storing a regulation
  Regulation regulation = new Regulation("GDPR", 
                                        "General Data Protection Regulation",
                                        "https://gdpr.eu/" 
                                        );
  Regulation savedRegulation = vault.save(regulation);

  // Retrieving all regulations
  List<Regulation> regulations = vault.getRegulations();

  // Retrieving specific regulation
  Regulation regulation = vault.getRegulation("GDPR");

  // Removing a specific regulation
  Boolean bool = vault.removeRegulation("GDPR");
  ```
