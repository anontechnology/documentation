# Libraries
Integrate into your Vault APIs using one of our official libraries.

We offer an official SDK for most languages widely used in the industry today and are actively maintained by our engineering team.

- Java
- Node.js
- Python
- C#
- PHP

Library not available for your desired language? Feel free to contribute to our [open source community](https://github.com/anontechnology)!

HOW DOES THE SDK WORK?

----------------------------------------------------------------------
VAULT SETUP

=== "C"

    ``` c
    #include <stdio.h>

    int main(void) {
      printf("Hello world!\n");
      return 0;
    }
    ```

=== "C++"

    ``` c++
    #include <iostream>

    int main(void) {
      std::cout << "Hello world!" << std::endl;
      return 0;
    }
    ```

  === "C"
  ``` c
  #include <stdio.h>

  int main(void) {
    printf("Hello world!\n");
    return 0;
  }
  ```
  === "C++"
  ``` c++
  #include <iostream>

  int main(void) {
    std::cout << "Hello world!" << std::endl;
    return 0;
  }
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
  === "Node.js"
  Coming Soon
  === "Python"
  Coming Soon
  === "C#"
  Coming Soon
  === "PHP"
  Coming Soon

----------------------------------------------------------------------
STORING DATA

=== "Java"
``` java
User user = vault.findByUser("User1234");
user.setAttribute("FIRST_NAME", "Jane");
vault.save(user);

// Car Example. Car dealership is an entity. Dealer’s customer is a User
Entity entity = vault.findByUser("Client6789");
entity.setAttribute("FULL_ADDRESS", "1 Hacker Way, Beverly Hills, CA 90210");
vault.save(entity);

// **** IN DOCS, CALL OUT THAT THESE NEXT TWO ARE FOR ENTITIES AS WELL
RETRIEVING ALL DATA FOR USER
User user = vault.findByUser("User1234");
List<Attribute> attributes = user.getAttributes();

Entity entity = vault.findByEntity("Client6789");
List<Attribute> attributes = entity.getAttributes();

RETRIEVING SPECIFIC DATA
User user = vault.findByUser("User1234");
UserAttribute attribute = user.getAttribute("FIRST_NAME");

Entity entity = vault.findByEntity("Client6789");
List<Attribute> attributes = entity.getAttribute("FULL_ADDRESS");

SEARCHING
List<Attribute> attributes = vault.search("LAST_NAME=='DOE'");

PURGING ALL USER DATA
User user = vault.findByUser("User1234");
user.purge();

REMOVING SPECIFIC DATA
User user = vault.findByUser("User1234");
user.remove("LAST_NAME");
```
=== "Node.js"
Coming Soon
=== "Python"
Coming Soon
=== "C#"
Coming Soon
=== "PHP"
Coming Soon

----------------------------------------------------------------------
STORING ATTRIBUTES
=== "Java"
``` java
// **** NEED TO SHOW SETTERS LIKE THIS AND HAVE IT BUILD USING A FEW DIFFERENT   
  PARAMETER LISTS WITH SOME OF THE FIELDS DEFAULTED
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

RETRIEVING ALL ATTRIBUTES
List<AttributeDefinition> attributes = vault.getAttributeDefinitions();

RETRIEVING SPECIFIC ATTRIBUTE
AttributeDefinition attribute = vault.getAttributeDefinition("Billing Address");
```
=== "Node.js"
Coming Soon
=== "Python"
Coming Soon
=== "C#"
Coming Soon
=== "PHP"
Coming Soon

----------------------------------------------------------------------
TAGS
=== "Java"
``` java
STORING A TAG
Tag tag = vault.save(new Tag("Financial Data"));

RETRIEVING ALL TAGS
List<Tag> tags = vault.getTags();

RETRIEVING SPECIFIC TAG
String tag = vault.getTag("Financial Data");

REMOVING A SPECIFIC TAG
Boolean bool = vault.removeTag("Financial Data");
```
=== "Node.js"
Coming Soon
=== "Python"
Coming Soon
=== "C#"
Coming Soon
=== "PHP"
Coming Soon

----------------------------------------------------------------------
REGULATIONS
=== "Java"
``` java

STORING A REGULATION
Regulation regulation = new Regulation("GDPR", 
                                       "General Data Protection Regulation",
                                       "https://gdpr.eu/" 
                                      );
Regulation savedRegulation = vault.save(regulation);

RETRIEVING ALL REGULATIONS
List<Regulation> regulations = vault.getRegulations();

RETRIEVING SPECIFIC REGULATION
Regulation = vault.getRegulation("GDPR");

REMOVING A SPECIFIC REGULATION
Boolean bool = vault.removeRegulation("GDPR");
```
=== "Node.js"
Coming Soon
=== "Python"
Coming Soon
=== "C#"
Coming Soon
=== "PHP"
Coming Soon
