# 🌱 PlantCare AI

PlantCare AI is an AI-powered plant-care assistant designed for beginner plant owners. Users enter a plant name and optionally describe a problem, and the application uses Google's Gemini AI to generate a simple, personalized care plan covering environment, lighting, watering, soil, temperature, possible problem causes, and practical care tips. I chose this idea because plant owners often need simple guidance without having to understand technical horticultural information.

## 🚀 Live Application

https://frontend-ai-capstone-liart.vercel.app/

## 📦 Repository

https://github.com/anilaashraf556-cpu/frontend-ai-capstone

## ✨ Features

* AI-generated plant care plans
* Plant problem analysis with possible causes
* Simple beginner-friendly recommendations
* Environment, lighting, watering, soil, and temperature guidance
* Practical care tips
* Required-field validation
* Error handling for failed AI requests
* Responsive interface for desktop and mobile
* Accessible form controls and error messages
* AI-generated information disclaimer

## 🛠️ Technology Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* Node.js
* Express
* Google Gemini AI
* Vitest
* Vercel

## 🏗️ Architecture

The application consists of a React frontend and an AI API endpoint.

### Frontend

The React application is located in `src/`.

`App.tsx`:

* Collects the plant name and optional problem description.
* Validates the required plant name.
* Sends the user's information to `/api/care-plan`.
* Displays loading and error states.
* Displays the generated care plan.

### AI API

The production API is located in `api/care-plan.js`.

The API:

1. Receives the plant name and optional problem.
2. Validates the request.
3. Sends a structured prompt to Gemini.
4. Requests a JSON response.
5. Parses the AI response.
6. Returns the care plan to the frontend.
7. Returns a safe error message if the request fails.

The original Express server in `server/index.js` is used for local development/testing.

## 🤖 AI Integration

PlantCare AI uses Google's Gemini model to generate practical plant-care guidance.

The AI receives:

* Plant name
* Optional description of the plant's problem

The prompt instructs the model to:

* Use beginner-friendly language.
* Provide practical care recommendations.
* Return structured JSON.
* Avoid claiming to diagnose plant diseases with certainty.
* Provide possible causes rather than definite diagnoses.
* Keep each section concise.

The structured response contains:

* Summary
* Environment
* Lighting
* Watering
* Soil
* Temperature
* Problem analysis
* Four care tips

The AI is therefore used to solve the application's main problem rather than functioning as a generic chatbot.

## ▶️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/anilaashraf556-cpu/frontend-ai-capstone.git
cd frontend-ai-capstone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the Gemini API key

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Never commit the API key to GitHub.

### 4. Run the frontend

```bash
npm run dev
```

### 5. Run the local API server

In another terminal:

```bash
node server/index.js
```

The local API server runs on:

```text
http://localhost:3001
```

## 🧪 Testing

Vitest is used for automated testing.

The project includes tests for:

* Empty plant-name validation
* Valid plant-name input
* Plant problem description input

Test command:

```bash
npx vitest run
```

Latest test result:

```text
Test Files  1 passed
Tests       3 passed
```

A screenshot of the test output is included in the repository as:

`test-results.png`

## ♿ Accessibility

The application was tested using accessibility auditing tools.

Latest results:

* Lighthouse Accessibility: **100%**
* Lighthouse Performance: **96%**
* WAVE accessibility audit: completed with no WCAG AA errors identified during testing

Accessibility improvements included:

* Proper labels for form inputs
* Keyboard-focus styles
* Accessible error messages using `role="alert"`
* Live result updates using `aria-live`
* Decorative emojis marked with `aria-hidden`
* Responsive layout for smaller screens
* Sufficient readable text and clear form controls

## ⚡ Performance

The latest Lighthouse audit achieved:

* **Performance: 96%**
* **Accessibility: 100%**

The audit screenshot is included in the repository as:

`lighthouse-audit.png`

## 🛡️ Error Handling & Safe Failure

The application handles several failure cases:

* Empty plant name → validation message
* Failed API request → user-friendly error message
* Missing Gemini API key → server configuration error
* Empty AI response → server error handling
* Invalid AI JSON → caught by the API error handler
* AI-generated advice includes a disclaimer explaining that it is general guidance

The application does not expose the Gemini API key in the frontend.

## 🚀 Deployment

The application is deployed on Vercel.

Production URL:

https://frontend-ai-capstone-liart.vercel.app/

The production API uses the `GEMINI_API_KEY` environment variable configured in Vercel.

### Deployment Checklist

* [x] Application builds successfully
* [x] Production deployment completed
* [x] Production URL tested
* [x] AI care-plan generation tested
* [x] Error state tested
* [x] Accessibility audited
* [x] Lighthouse performance audited
* [x] Automated tests passing
* [x] API key stored as an environment variable
* [x] Source code pushed to GitHub

### Rollback Plan

If a production deployment introduces a problem, the previous working Vercel deployment can be restored/redeployed. GitHub `main` contains the production source code and provides the history needed to identify or revert changes.

## ⚠️ Known Limitations

* AI recommendations are general guidance and may not account for every plant variety or local growing condition.
* The application does not use an image to identify plants.
* AI responses depend on the availability of the Gemini API.
* The application does not replace advice from a qualified horticultural professional.
* There is currently no user account or saved care-plan history.

## 🔮 Future Improvements

Possible future improvements include:

* Plant image identification
* Saving previous care plans
* User accounts
* Plant-care reminders
* More detailed regional/environmental recommendations
* Additional automated end-to-end tests
* Improved monitoring and analytics

## 📚 Project Context

This project was developed as the capstone project for the **FlyRank Front-end AI Engineering Internship**.

The project demonstrates:

* Accessible frontend development
* AI integration
* Resilient error handling
* Automated testing
* Performance optimization
* Production deployment
* Technical documentation
* Reflection on the development process

## 📊 V2 Evaluation Results

The V2 version was evaluated by testing the main end-to-end user flow:

**Plant information → AI request → Generated care plan**

### Functional evaluation

* Entered a valid plant name and generated a care plan successfully.
* Tested the optional plant-problem description.
* Confirmed that the generated response is displayed in separate care sections.
* Confirmed that the application handles invalid or missing required input.
* Confirmed that failed AI requests display a user-friendly error message.
* Confirmed that the production application successfully generates care plans using the deployed AI API.

### Example evaluation

**Input:** `mango plant`

**Result:** The application successfully generated a structured care plan covering the plant overview, environment, light, watering, soil, temperature, and practical care tips.

> The V2 evaluation focuses on functional behavior rather than claiming an AI accuracy percentage, because no formal labeled evaluation dataset was created for this version.

## 🧠 AI Development Disclosure

AI tools were used during development to assist with coding, debugging, problem-solving, and implementation guidance. I reviewed and tested the resulting work and remained responsible for integrating the frontend, AI API, validation, error handling, accessibility improvements, testing, deployment, and final project decisions.

The AI is part of the product itself: PlantCare AI uses Google's Gemini AI to generate the plant-care guidance returned to the user.

## 🏗️ V2 Architecture Flow

```text
User
  │
  │ Plant name + optional problem
  ▼
React + TypeScript Frontend
  │
  │ POST /api/care-plan
  ▼
Vercel API Endpoint
  │
  │ Structured prompt
  ▼
Google Gemini AI
  │
  │ Structured care-plan response
  ▼
Vercel API
  │
  ▼
React Frontend
  │
  ▼
Personalized Plant Care Plan
```

## 🎯 Assignment 8.1 Demo

A 3–5 minute live demonstration accompanies this README. The demo shows the complete PlantCare AI workflow, explains one important design decision, and discusses the current limitation that the application accepts text input but does not yet support plant-image uploads.

# PlantCare AI

PlantCare AI is a web app that helps users get a simple plant care plan by entering a plant name and a short description of the problem.

The app uses an AI API to generate the care plan. It also has input validation and API protection to reduce unnecessary API usage.

## Live Demo

https://frontend-ai-capstone-liart.vercel.app/
## What the App Does

The user enters:

* Plant name
* A short description of the plant problem

After submitting the form, the app sends the information to the API. The API sends the request to the AI service and returns a care plan for the plant.

## Features

* Generate plant care plans using AI
* Simple and easy-to-use interface
* Plant name validation
* Description length limit
* Request body size limit
* Rate limiting to reduce API abuse
* Error handling for invalid requests
* Deployed on Vercel

## Screenshots

### PlantCare AI

Add a screenshot of the main application here.

```text
![PlantCare AI](screenshots/home.png)
```

### Generated Care Plan

Add a screenshot showing a generated care plan here.

```text
![Generated Care Plan](screenshots/care-plan.png)
```

## Environment Variables

| Variable                       | Purpose                       | Required |
| ------------------------------ | ----------------------------- | -------- |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Used to access the AI service | Yes      |

## Project Structure

The main parts of the project are:

```text
Frontend
   |
   v
Care Plan API
   |
   +--> Input validation
   |
   +--> Rate limiting
   |
   v
AI service
   |
   v
Generated care plan
```

The frontend collects the user's information and sends it to the care-plan API.

The API checks the request before sending it to the AI service. If the request is valid, the AI service generates the care plan and the result is shown to the user.

## API Protection

I added several protections to the API so that invalid or unnecessarily large requests do not use API credits.

### Rate Limiting

The API allows up to **10 requests per minute per IP address**.

If the limit is reached, the API returns:

```text
HTTP 429
```

### Input Limits

The API has these limits:

| Input               |          Limit |
| ------------------- | -------------: |
| Plant name          | 100 characters |
| Problem/description | 500 characters |
| Request body        |          10 KB |

If the request is too large, the API returns:

```text
HTTP 413
```

Invalid input returns:

```text
HTTP 400
```

The API also has a `maxDuration` of **60 seconds** to prevent a serverless request from running for too long.

## Testing

I tested the API with these cases:

* Normal plant name and description — passed
* Empty plant name — rejected
* Plant name longer than 100 characters — rejected
* Description longer than 500 characters — rejected
* Description with 500 or fewer characters — accepted

## Browser Testing

I tested the production website in:

* Microsoft Edge — passed
* Google Chrome — passed
* Firefox — passed

## Deployment

The project is deployed using Vercel.

The production version can be accessed here:

https://frontend-ai-capstone-liart.vercel.app/

## Important Decisions

I kept the input limits small because the application only needs short plant information.

The API checks the input before calling the AI service. This helps avoid sending invalid requests and wasting API credits.

I also added rate limiting because the API is publicly accessible and should not allow unlimited requests from the same IP address.

## How AI Tools Were Used

I used AI-assisted development during this project to help with parts of the development process.

I used AI tools to:

* Understand the project requirements
* Help build and improve the frontend
* Work on the AI API integration
* Find and fix development errors
* Add input validation and API protection
* Suggest testing cases
* Review the implementation and explain errors

I still tested the application myself and checked the changes before using them.

## Future Improvements

Some things I could add later are:

* User accounts
* Saved plant care plans
* More detailed plant information
* Better rate limiting using a persistent store
* More plant-specific recommendations
* Improved mobile UI





