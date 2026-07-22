# Prompt:
As a Senior QA Engineer, create  Login/Authentication.md test case matrix — positive/negative/edge cases, boundary values for the Login/Authentication module. Use TCs from RTM against  Req IDs and Test Case IDs and add additional ones that have a high priority, impact if broken and likelihood of failure

# Before - AI response:
Both files are complete and ready. Here's a summary of what was built:                             
  ──────                                                                                             
  ## ✅ Login/Authentication Test Case Matrix — Delivered                                            
                                                                                                     
  Two files were created in your previous session:                                                   
                                                                                                     
  • 📄 test-cases.md — Primary deliverable inside the existing module directory                      
  • 📄 Authentication.md — Mirrored copy at Login/Authentication.md path                             
  ──────                                                                                             
  ### What's Inside (15 Test Cases Total)                                                            
                                                                                                     
  #### From RTM (TC-LOGIN-001–006) — All 6 RTM Cases Covered                                         
                                                                                                     
   TC ID                        │ Req ID                      │ Category
  ──────────────────────────────┼─────────────────────────────┼──────────────────────────────────────
   TC-LOGIN-001                 │ REQ-LOGIN-01                │ ✅ Positive — valid login
   TC-LOGIN-002                 │ REQ-LOGIN-02                │ ❌ Negative — invalid credentials
   TC-LOGIN-003                 │ REQ-LOGIN-03                │ 🔲 Boundary — empty fields
   TC-LOGIN-004                 │ REQ-LOGIN-04                │ 🔐 Security — SQL/XSS injection
   TC-LOGIN-005                 │ REQ-LOGIN-05                │ ✅ Functional — Forgot Password flow
   TC-LOGIN-006                 │ REQ-LOGIN-06                │ 🔀 Edge — case sensitivity
                                                                                                     
  #### Added High-Priority Cases (TC-LOGIN-007–015)                                                  
                                                                                                     
   TC ID                                      │ Rationale (Impact × Likelihood)
  ────────────────────────────────────────────┼──────────────────────────────────────────────────────
   TC-LOGIN-007                               │ Logout + session invalidation — Critical
   TC-LOGIN-008                               │ Browser back after logout (cache headers) — Critical
   TC-LOGIN-009                               │ Whitespace trimming in credentials — High
   TC-LOGIN-010                               │ Session inactivity timeout — High
   TC-LOGIN-011                               │ Max-length boundary values on fields — Low
   TC-LOGIN-012                               │ Direct URL deep-link without session — Critical
   TC-LOGIN-013                               │ Password masking (type=password) — Low
   TC-LOGIN-014                               │ Brute-force / rate limiting lockout — Critical
   TC-LOGIN-015                               │ Forgot Password user enumeration prevention — High
                                                                                                     
  Each TC includes: Pre-conditions · Step-by-step instructions · Test data · Expected results · Post-
  conditions · Priority · Automation verdict.


# After - Reviewed file

## 1. TC-LOGIN-004
*Problem:* The AI merged a SQL-injection check and an XSS check into a single test case with a single ID. If the SQLi assertion passes but the XSS assertion fails, the whole TC will just show 'Fail'. The Test Data field also lists a `' UNION SELECT NULL--` that never appears in any Test Step.

*Before:* TC-LOGIN-004: System handles script/SQL injection payloads safely without crash or bypass. Test Data lists three payloads; only two are used in steps.

*After:* TC is split in two sub-cases with expected results accordindly. Test Data updated.
- **Test Steps**:
1. **Sub-case 4a**: 
  1. In `Username` field, input SQL injection payload: `' OR '1'='1' --`.
  2. In `Password` field, input `' OR '1'='1'`. Click `Login`.
- **Expected Results**:
  1. No SQL syntax error, stack trace, or database exception leaks to UI. 
  2. HTTP response is 200/302 (not 500), response body contains no SQL error string or stack trace, and user is not authenticated.
2. **Sub-case 4b**:
  1. In `Username` field, input XSS script payload: `<script>alert('XSS')</script>`.
  2. In `Password` field, input `<img src=x onerror=alert(1)>`. Click `Login`.
- **Expected Results**:
  1. Authentication is rejected with standard `"Invalid credentials"` message.
  2. XSS payload script does NOT execute in browser DOM context.
- **Test Data**: `' OR '1'='1'`, `<script>alert('XSS')</script>`

## 2. TC-LOGIN-013
*Problem:* Priority contradicts the document's own Risk model in Section 2.

*Before:* P2, Low x Low = Low

*After:*  Impact corrected from Low to Medium, since it's related also to Security check.

## 3. TC-LOGIN-014 
*Problem:* Feature Not Implemented




