## Examples

### 1
Used Claude to update Requirenment Traceability Matrix based on found User Guide (https://help.orangehrm.com/hc/en-us/categories/360002207133-User-Guides) for OrangeHRM. Reviewed and updated according to DEMO version relevance. 
**For ex:** 
| REQ-PIM-05 | User can search for an employee by partial name/~~filter~~ and get correctly filtered results | *How to Access the Employee Management* (Supervisor) ~~— filter icon in Employee List~~ | Requrement is not relevant for demo version, there is not filter icon for Supervisor.
~~| REQ-LOGIN-14 | Repeated consecutive failed login attempts trigger rate limiting, CAPTCHA, or a temporary account lockout | Derived | P1 | TC-LOGIN-014 |~~ N | **Fail** | Feature is not implemented in demo version.


### 2
Used Claude to generate 15 test cases for login/authentication validation. Reviewed and updated for any inconsistencies. 
**For ex:** 
TC-LOGIN-013
*Problem:* Priority contradicts the document's own Risk model in Section 2.
*Before:* P2, Low x Low = Low
*After:*  Impact corrected from Low to Medium, since it's related also to Security check.
(See exploratory notes for each module)

TC-LOGIN-014 - Feature Not Implemented