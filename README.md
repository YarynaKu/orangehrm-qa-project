# OrangeHRM QA Project 

This repository contains an **end-to-end testing suite** for **https://automationexercise.com/** website.  

---

## About the Project
The project is built using **Playwright** with **TypeScript** and follows modern QA standards including Test Strategy planning, Requirements Traceability Matrix (RTM), and automated CI/CD integration.

It covers key Human Resource Management (HRM) user flows, such as:
- Admin authentication & login workflows
- Personnel Information Management (PIM) — adding, editing, searching, and deleting employees
- Admin module user management and system configurations
- Access validation across various HRM modules
  
This project was created as a portfolio project to demonstrate practical test automation skills, framework architecture, and CI/CD integration in enterprise application environments.

## Tech Stack
- Languages: TypeScript
- Testing Framework: Playwright
- CI/CD: GitHub Actions
- IDE: Visual Studio Code
- Version Control: Git & GitHub

## Test Coverage
The automated tests verify:
- User registration and deletion
- Login with valid credentials
- Product browsing and product details
- Search functionality
- Product categories and brands
- Adding random products to cart
- Order placement and invoice download
- Contact Us form submission
- Footer subscription
- Recommended items section

---
## Project Structure

- `.github/workflows/` → GitHub Actions CI/CD workflows;
- `automation/` → Test suites, spec files, and Playwright configuration;
- `docs/` → Test Strategy, Requirements Traceability Matrix (RTM), and notes;
- `modules/` → Manual Test Cases for main application modules;

## Notes
Bug reports are located in the GitHub Issues Tab.

---

## About Me

I'm a dedicated QA Engineer with experience in web application testing and data validation using SQL. Skilled in creating, executing, and maintaining manual and automated test cases. Proficient in error analysis, documentation, and tracking throughout the entire error resolution process. 
After a career break, I've refreshed and expanded my skills using **Playwright**, creating **robust automation frameworks**, and improving QA processes to deliver **reliable, bug-free products**.  


### Contact Me
- Email: yarynakushniruk@gmail.com
- LinkedIn: https://www.linkedin.com/in/yaryna-kushniruk-964425b0/

---

## Installation & Running Tests

```bash
1. Clone the repository:
git clone https://github.com/YarynaKu/orangehrm-qa-project.git
cd orange-qa-project

2. Install dependencies:
npm install

3. Install Playwright browsers:
npx playwright install

Run all tests:
npx playwright test

Run tests in UI mode:
npx playwright test --headed

Run a specific test file:
npx playwright test tests/Login.spec.ts

View test report:
npx playwright show-report
