# Test Case Matrix — Login & Authentication Module

**Module**: Login & Authentication  
**Application**: OrangeHRM Open Source Demo (`https://opensource-demo.orangehrmlive.com`)  
**Author**: Yaryna Kushniruk  
**Last Updated**: 2026-07-22  
**Status**: Active / Ready for Execution  

---

## 1. Executive Summary & Module Overview

The **Login & Authentication** module serves as the primary gatekeeper for the OrangeHRM application. Security, reliability, and proper session state handling in this module are essential to protect corporate HR data and control role-based system access.

This Test Case Matrix covers end-to-end authentication testing including:
- **Positive Scenarios**: Standard valid authentication, logout flows, and session establishment.
- **Negative Scenarios**: Invalid credential combinations, empty field validations, and non-existent user password resets.
- **Boundary Value Scenarios**: Extreme input string lengths (min/max boundary limits) and field constraints.
- **Edge & Security Scenarios**: SQL/Script injection payload resilience, whitespace trimming, browser history caching post-logout, direct URL deep-linking without session, session inactivity expiration, and rate-limiting / lockout defense.

---

## 2. Risk & Impact Prioritization Matrix

Test cases are prioritized using a standard Risk Model:  
$$\text{Risk} = \text{Impact if Broken} \times \text{Likelihood of Failure}$$

| Priority Level | Description | Execution & Automation Strategy |
|---|---|---|
| **P1 (Critical)** | Core login, logout, authentication security, and session boundary checks. Failure blocks all system access or causes severe security vulnerability. | **100% Automated** in CI/CD pipeline (Playwright E2E suite). Must pass prior to release. |
| **P2 (High / Medium)** | Non-blocking functional flows (e.g. Forgot Password, whitespace handling, input boundary constraints). | Automated where practical; covered in regression test cycles. |
| **P3 (Low)** | Cosmetic UI checks, password masking display options, non-critical field helper text. | Manual exploratory test execution. |

---

## 3. Requirements Traceability & Test Case Matrix Summary

| Test Case ID | Req ID | Test Case Title | Category | Priority | Risk (Impact × Likelihood) | Automated? | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| **TC-LOGIN-001** | REQ-LOGIN-01 | User can log in with valid credentials | Positive (Happy Path) | **P1** | High × Low = **High** | Yes | Pass |
| **TC-LOGIN-002** | REQ-LOGIN-02 | System rejects invalid username/password with clear error message | Negative | **P1** | High × Medium = **High** | Yes | Pass |
| **TC-LOGIN-003** | REQ-LOGIN-03 | System blocks submission when username or password field is empty | Boundary / Negative | **P1** | High × Medium = **High** | Yes | Pass |
| **TC-LOGIN-004** | REQ-LOGIN-04 | System handles script/SQL injection payloads safely without crash or bypass | Security / Edge | **P1** | High × High = **Critical** | Yes | Pass |
| **TC-LOGIN-005** | REQ-LOGIN-05 | "Forgot Password" flow is reachable and displays expected confirmation step | Positive / Functional | **P2** | Medium × Medium = **Medium** | No | Pass |
| **TC-LOGIN-006** | REQ-LOGIN-06 | Username and Password fields behave consistently regarding case sensitivity | Edge / Functional | **P2** | Medium × Low = **Medium** | No | Pass |
| **TC-LOGIN-007** | REQ-LOGIN-07 | User logout invalidates session and redirects to login page | Positive / Security | **P1** | High × High = **Critical** | Yes | Pass |
| **TC-LOGIN-008** | REQ-LOGIN-08 | Post-logout browser back button navigation is blocked by session cache headers | Security / Edge | **P1** | High × High = **Critical** | No | Pass |
| **TC-LOGIN-009** | REQ-LOGIN-09 | Username and password leading/trailing whitespace handling during login | Edge / Boundary | **P2** | Medium × High = **High** | Yes | **Fail** | Allowed to log in for `"Admin "` username but refused for `" Admin"` |
| **TC-LOGIN-010** | REQ-LOGIN-10 | Session inactivity timeout forces re-authentication upon subsequent request | Security / Edge | **P1** | High × Medium = **High** | No | Pass |
| **TC-LOGIN-011** | REQ-LOGIN-11 | Maximum input character boundary limit validation on credentials fields | Boundary Value | **P2** | Medium × Low = **Low** | Yes | Pass |
| **TC-LOGIN-012** | REQ-LOGIN-12 | Direct URL deep-linking attempt to protected dashboard without active session | Security / Edge | **P1** | High × High = **Critical** | Yes | Pass |
| **TC-LOGIN-013** | REQ-LOGIN-13 | Password input field masks characters by default with toggle option | Functional / Security / UI | **P2** | Medium × Low = **Medium** | No | Pass |
| **TC-LOGIN-014** | REQ-LOGIN-14 | Repeated consecutive failed login attempts trigger rate limiting / lockout | Security / Negative | **P1** | High × High = **Critical** | No | **Fail** | Feature Not Implemented |
| **TC-LOGIN-015** | REQ-LOGIN-15 | "Forgot Password" request with non-existent username prevents user enumeration | Security / Negative | **P2** | High × Medium = **High** | No | Pass |

---

## 4. Detailed Test Specifications

### TC-LOGIN-001: User can log in with valid credentials
- **Linked Requirement**: [REQ-LOGIN-01](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L19)
- **Category**: Positive (Happy Path)
- **Priority**: P1 (Impact: High | Likelihood: Low)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**:
  1. Browser is launched and navigated to `https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`.
  2. User is not currently authenticated.
- **Test Steps**:
  1. Enter valid username (`Admin`) into the `Username` input field.
  2. Enter valid password (`admin123`) into the `Password` input field.
  3. Click the `Login` submit button.
- **Test Data**: `Username: Admin`, `Password: admin123`
- **Expected Results**:
  1. System authenticates user successfully.
  2. Browser redirects to the Dashboard URL (`/web/index.php/dashboard/index`).
  3. Dashboard header displays user profile widget and main menu items (Admin, PIM, Leave, etc.).
- **Post-conditions**: Active session cookie (`orangehrm`) set in browser storage.

---

### TC-LOGIN-002: System rejects invalid username/password with clear error message
- **Linked Requirement**: [REQ-LOGIN-02](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L20)
- **Category**: Negative
- **Priority**: P1 (Impact: High | Likelihood: Medium)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: User is on the Login page (`/auth/login`).
- **Test Steps**:
  1. **Sub-case 2a (Invalid Username)**: Enter `InvalidUser`, enter `admin123`, click `Login`.
  2. **Sub-case 2b (Invalid Password)**: Enter `Admin`, enter `wrongpass123`, click `Login`.
  3. **Sub-case 2c (Both Invalid)**: Enter `InvalidUser`, enter `wrongpass123`, click `Login`.
- **Test Data**:
  - Sub-case 2a: `InvalidUser / admin123`
  - Sub-case 2b: `Admin / wrongpass123`
  - Sub-case 2c: `InvalidUser / wrongpass123`
- **Expected Results**:
  1. System rejects authentication attempt for all sub-cases.
  2. User remains on the Login page.
  3. An alert banner appears displaying generic error message: `"Invalid credentials"`.
  4. Password field is cleared; username field retains user input or is ready for re-entry.
- **Post-conditions**: No session token created.

---

### TC-LOGIN-003: System blocks submission when username or password field is empty
- **Linked Requirement**: [REQ-LOGIN-03](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L21)
- **Category**: Boundary Value / Negative
- **Priority**: P1 (Impact: High | Likelihood: Medium)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: User is on the Login page.
- **Test Steps**:
  1. **Sub-case 3a (Both Empty)**: Leave `Username` and `Password` blank -> Click `Login`.
  2. **Sub-case 3b (Username Empty)**: Leave `Username` blank, enter `admin123` -> Click `Login`.
  3. **Sub-case 3c (Password Empty)**: Enter `Admin`, leave `Password` blank -> Click `Login`.
- **Test Data**: Empty fields / `Admin` / `admin123`
- **Expected Results**:
  1. Form submission is halted client-side/server-side without network request or backend exception.
  2. Inline validation error message `"Required"` appears immediately beneath each blank mandatory input field in red text.
  3. Input field borders highlight in red error styling (`--oxd-input-field-error-color`).
- **Post-conditions**: Page stays on `/auth/login`.

---

### TC-LOGIN-004: System handles script/SQL injection payloads safely without crash or bypass
- **Linked Requirement**: [REQ-LOGIN-04](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L22)
- **Category**: Security / Edge Case
- **Priority**: P1 (Impact: High | Likelihood: High)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: User is on the Login page.
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
- **Post-conditions**: Application state remains secure and operational.

---

### TC-LOGIN-005: "Forgot Password" flow is reachable and displays expected confirmation step
- **Linked Requirement**: [REQ-LOGIN-05](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L23)
- **Category**: Positive / Functional
- **Priority**: P2 (Impact: Medium | Likelihood: Medium)
- **Automation Status**: Manual / API Candidate
- **Pre-conditions**: User is on the Login page.
- **Test Steps**:
  1. Click the `"Forgot your password?"` link located below the login button.
  2. Verify navigation to the Reset Password page (`/auth/requestPasswordResetCode`).
  3. Input existing valid username (`Admin`).
  4. Click `"Reset Password"` button.
- **Test Data**: Username: `Admin`
- **Expected Results**:
  1. User is directed to `/auth/requestPasswordResetCode`.
  2. After submitting valid username, confirmation screen displays message: `"Reset password link sent to your email"`.
  3. A `"Cancel"` button returns user to the main Login page.
- **Post-conditions**: Password reset token generated in backend.

---

### TC-LOGIN-006: Username and Password fields behave consistently regarding case sensitivity
- **Linked Requirement**: [REQ-LOGIN-06](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L24)
- **Category**: Edge Case / Functional
- **Priority**: P2 (Impact: Medium | Likelihood: Low)
- **Automation Status**: Manual
- **Pre-conditions**: User is on the Login page.
- **Test Steps**:
  1. Enter lowercase username `admin` and valid password `admin123` -> Click `Login`.
  2. Enter uppercase username `ADMIN` and valid password `admin123` -> Click `Login`.
  3. Enter correct username `Admin` and modified case password `ADMIN123` -> Click `Login`.
- **Test Data**: `admin / admin123`, `ADMIN / admin123`, `Admin / ADMIN123`
- **Expected Results**:
  1. Username evaluation: OrangeHRM accepts case-insensitive username (`admin` / `Admin` / `ADMIN` succeed).
  2. Password evaluation: Password is strictly **case-sensitive** (`ADMIN123` fails with `"Invalid credentials"`).
- **Post-conditions**: Login succeeds for correct password regardless of username casing; fails if password casing differs.

---

### TC-LOGIN-007: User logout invalidates session and redirects to login page
- **Linked Requirement**: REQ-LOGIN-07 (Added High-Priority Case)
- **Category**: Positive / Security
- **Priority**: P1 (Impact: High | Likelihood: High)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: User is logged in and currently viewing the Dashboard page.
- **Test Steps**:
  1. Click on user dropdown menu in top right header corner.
  2. Click `"Logout"` option from dropdown menu.
- **Test Data**: N/A
- **Expected Results**:
  1. Session token/cookie is cleared.
  2. User is immediately redirected to Login page (`/web/index.php/auth/login`).
  3. Attempting to access protected URLs (`/dashboard/index`) redirects back to login page.
- **Post-conditions**: User session terminated completely.

---

### TC-LOGIN-008: Post-logout browser back button navigation is blocked by session cache headers
- **Linked Requirement**: REQ-LOGIN-08 (Added High-Priority Case)
- **Category**: Security / Edge Case
- **Priority**: P1 (Impact: High | Likelihood: High)
- **Automation Status**: Manual
- **Pre-conditions**: User has successfully logged in, navigated through Dashboard, and clicked `"Logout"`.
- **Test Steps**:
  1. After logout redirect to `/auth/login`, click the browser `Back` button.
  2. Observe whether cached authenticated pages load or re-authentication is forced.
  3. Click any link on page if cached view displays.
- **Test Data**: N/A
- **Expected Results**:
  1. HTTP headers `Cache-Control: no-cache, no-store, must-revalidate` prevent viewing sensitive session data.
  2. Browser back navigation either reloads the Login page or fails immediately with session expired alert upon any user action.
- **Post-conditions**: Unauthenticated user cannot view user data in history cache.

---

### TC-LOGIN-009: Username and password leading/trailing whitespace handling during login
- **Linked Requirement**: REQ-LOGIN-09 (Added High-Priority Case)
- **Category**: Edge Case / Boundary Value
- **Priority**: P2 (Impact: Medium | Likelihood: High)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: User is on Login page.
- **Test Steps**:
  1. Input username with leading space: `" Admin"` and password `"admin123"`. Click `Login`.
  2. Input username with trailing space: `"Admin "` and password `"admin123"`. Click `Login`.
  3. Input password with trailing space: `"Admin"` and password `"admin123 "`. Click `Login`.
- **Test Data**: `" Admin"`, `"Admin "`, `"admin123 "`
- **Expected Results**:
  1. Username field auto-trims leading/trailing whitespace or system accepts valid login.
  2. Password field preserves exact literal characters (spaces included); trailing space password fails authentication unless actual password contains space.
- **Post-conditions**: No unexpected crash or invalid whitespace parsing error.

---

### TC-LOGIN-010: Session inactivity timeout forces re-authentication upon subsequent request
- **Linked Requirement**: REQ-LOGIN-10 (Added High-Priority Case)
- **Category**: Security / Edge Case
- **Priority**: P1 (Impact: High | Likelihood: Medium)
- **Automation Status**: Manual
- **Pre-conditions**: User logged into application.
- **Test Steps**:
  1. Leave application idle without user interaction (mouse/keyboard) for configured session timeout period (e.g. 15-30 minutes).
  2. Perform an action (e.g. click "PIM" menu link).
- **Test Data**: N/A
- **Expected Results**:
  1. Idle session expires automatically backend-side.
  2. Action fails gracefully and user is redirected to Login page with session expired notification.
- **Post-conditions**: Unattended workstation cannot be exploited after timeout window.

---

### TC-LOGIN-011: Maximum input character boundary limit validation on credentials fields
- **Linked Requirement**: REQ-LOGIN-11 (Added High-Priority Case)
- **Category**: Boundary Value
- **Priority**: P2 (Impact: Medium | Likelihood: Low)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: User is on Login page.
- **Test Steps**:
  1. Generate a 255-character string and a 1000-character string.
  2. Input 255+ characters into `Username` field.
  3. Input 255+ characters into `Password` field. Click `Login`.
- **Test Data**: String of 256 'A' characters (`AAAA...`)
- **Expected Results**:
  1. UI limits input length (e.g. `maxlength` attribute) or trims cleanly without truncating database queries.
  2. Server responds with structured `"Invalid credentials"` or validation message.
  3. No HTTP 500 Internal Server Error, buffer overflow, or page crash occurs.
- **Post-conditions**: System maintains web server stability.

---

### TC-LOGIN-012: Direct URL deep-linking attempt to protected dashboard without active session
- **Linked Requirement**: REQ-LOGIN-12 (Added High-Priority Case)
- **Category**: Security / Edge Case
- **Priority**: P1 (Impact: High | Likelihood: High)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: Incognito/private browser session with cleared cookies.
- **Test Steps**:
  1. Enter direct URL of protected internal page: `https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList`.
  2. Press Enter.
- **Test Data**: Protected URL: `/web/index.php/pim/viewEmployeeList`
- **Expected Results**:
  1. Authentication middleware intercepts request.
  2. Page automatically redirects to Login URL `/web/index.php/auth/login`.
  3. Protected employee list content is completely shielded from unauthorized view.
- **Post-conditions**: No unauthorized access granted.

---

### TC-LOGIN-013: Password input field masks characters by default with toggle option
- **Linked Requirement**: REQ-LOGIN-13 (Added High-Priority Case)
- **Category**: Functional / Security / UI
- **Priority**: P2 (Impact: Medium | Likelihood: Low)
- **Automation Status**: Manual
- **Pre-conditions**: User is on Login page.
- **Test Steps**:
  1. Type characters into `Password` field.
  2. Inspect input element type in DOM and rendered visual state.
- **Test Data**: `admin123`
- **Expected Results**:
  1. Password field has attribute `type="password"`.
  2. Characters are rendered masked (dots/asterisks) to prevent shoulder surfing.
- **Post-conditions**: Credentials visual privacy maintained.

---

<!-- ### TC-LOGIN-014: Repeated consecutive failed login attempts trigger rate limiting / lockout
- **Linked Requirement**: REQ-LOGIN-14 (Added High-Priority Case)
- **Category**: Security / Negative
- **Priority**: P1 (Impact: High | Likelihood: High)
- **Automation Status**: Manual / API
- **Pre-conditions**: User is on Login page.
- **Test Steps**:
  1. Submit 5 consecutive login attempts with wrong password for user `Admin`.
  2. Observe response on 5th/6th attempt.
- **Test Data**: `Username: Admin`, `Password: WrongPass1`, `WrongPass2`, etc.
- **Expected Results**:
  1. Rate limiting / CAPTCHA / temporary account lock activates after threshold (if configured in OrangeHRM security settings).
  2. Brute force attempts are throttled with appropriate warning banner.
- **Post-conditions**: Brute-force attacks prevented. -->

---

### TC-LOGIN-015: "Forgot Password" request with non-existent username prevents user enumeration
- **Linked Requirement**: REQ-LOGIN-15 (Added High-Priority Case)
- **Category**: Security / Negative
- **Priority**: P2 (Impact: High | Likelihood: Medium)
- **Automation Status**: Manual
- **Pre-conditions**: User is on Reset Password page (`/auth/requestPasswordResetCode`).
- **Test Steps**:
  1. Enter a non-existent username (e.g. `NonExistentUser999`).
  2. Click `"Reset Password"`.
- **Test Data**: `NonExistentUser999`
- **Expected Results**:
  1. System returns a generic success/confirmation message identical to valid requests (e.g. `"If the username exists, a reset link has been sent"`).
  2. System does NOT disclose whether `NonExistentUser999` exists in database (prevents user enumeration attack).
- **Post-conditions**: Application prevents credential harvesting.
