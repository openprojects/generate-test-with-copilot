---
name: Check Add notes
description: Check if the "Add notes" field is mandatory
---

Generate a Playwright test for the following scenario:

Navigate to https://indico.un.org/event/1026728
Go to the Registration page
Verify that "Add notes" field is mandatory
If it is not mandatory, consider the test as Failed
Do not submit the registration
When the test is completed, open the browser pointing to http://localhost:9323
After this last step, you can kill the report server but keep the browser with the report open
