PlantCare AI 🌱

PlantCare AI is a small AI-enhanced web application that helps beginner plant owners create simple, practical care plans for their plants. Users enter a plant name and can optionally describe a problem, and the application uses Google's Gemini AI to generate personalized guidance about environment, lighting, watering, soil, temperature, possible problem causes, and practical tips. I chose this idea because plant care can be confusing for beginners, and AI can turn general plant-care knowledge into easy-to-understand guidance.

Live Application

Production URL:
https://frontend-ai-capstone-tau.vercel.app/

GitHub Repository:
https://github.com/anilaashraf556-cpu/frontend-ai-capstone

Features
🌱 Generate an AI-powered plant care plan
🔍 Optional plant-problem analysis
💡 Lighting, watering, soil, temperature, and environment guidance
⚠️ Safe handling of possible plant problems without claiming a definite diagnosis
📱 Responsive interface for desktop and mobile
♿ Accessibility-focused interface
❌ Error handling when the AI service is unavailable
⚡ Production deployment on Vercel
Technology Stack
React
TypeScript
Vite
Node.js
Express
Google Gemini API
Vercel
Git/GitHub
How to Run Locally
1. Clone the repository
git clone https://github.com/anilaashraf556-cpu/frontend-ai-capstone.git
cd frontend-ai-capstone
2. Install dependencies
npm install
3. Configure the AI API key

Create a .env.local file in the project root:

GEMINI_API_KEY=your_api_key_here

Never commit your API key to GitHub.

4. Start the frontend
npm run dev

The Vite development server will provide the local application URL.

5. Start the AI server

In a separate terminal:

node server/index.js

The Express server runs the AI care-plan endpoint locally.

Architecture Overview

The application has two main parts:

Frontend

The React + TypeScript frontend collects the user's plant information and displays the generated care plan.

Main responsibilities:

User input
Form validation
Loading states
Error states
Displaying the AI-generated care plan
Accessible and responsive UI
Backend

The Express server provides the /api/care-plan endpoint.

Its responsibilities are:

Receive the plant name and optional problem
Validate the request
Send a structured prompt to Gemini
Request JSON output
Parse the AI response
Return the care-plan data to the frontend
Return a safe error message if generation fails
AI Integration

PlantCare AI uses the Google Gemini API to generate the care plans.

The AI is used for a specific purpose rather than as a general chatbot. It transforms a user's plant name and optional problem description into a structured care plan.

The prompt asks the model to return:

Summary
Environment
Lighting
Watering
Soil
Temperature
Problem analysis
Four practical tips

The application requests JSON output so the frontend can reliably display each section.

The prompt also instructs the model to:

Use simple language for beginners
Keep information concise and practical
Avoid claiming to diagnose plant diseases with certainty
Provide possible causes rather than definite diagnoses
Resilience and Error Handling

The application validates required input before sending an AI request.

If the AI request fails or returns an invalid/empty response, the backend returns a safe error response instead of exposing technical details to the user.

The interface also provides an error state so users know that the care plan could not be generated and can try again.

Testing

The project uses automated tests to verify important application behavior.

Testing includes:

Input validation
Required-field validation
Error handling

Tests are run with:

npx vitest run

The tests were executed successfully during the production-readiness work.

Accessibility

Accessibility was checked during the project using accessibility testing tools and keyboard testing.

The application was reviewed for:

Keyboard accessibility
Form usability
Required-field feedback
Color/contrast issues
Accessible interaction states
Responsive behavior

The WAVE audit reported:

0 errors
0 contrast errors
0 alerts

A concrete improvement made during the audit process was improving keyboard accessibility and interaction states.

Performance

The application was checked with Lighthouse.

The Lighthouse audit evidence is included in the repository:

lighthouse-audit.png

Performance and accessibility were reviewed as part of the production-readiness process.

Deployment

The application is deployed to Vercel.

Production URL:

https://frontend-ai-capstone-tau.vercel.app/

Deployment was tested by opening the production application and generating a care plan successfully.

Deployment Checklist

Application builds successfully

Application deployed to production

Production URL tested

AI care-plan generation tested

Form validation tested

Error handling tested

Accessibility reviewed

Lighthouse audit completed

Mobile behavior checked

GitHub repository updated

Environment secrets kept out of source control

Rollback and Monitoring

The project is maintained through GitHub and deployed through Vercel.

If a production deployment introduces a problem, the rollback approach is:

Identify the problematic commit or deployment.
Restore the last known working version.
Push the corrected version to the main branch.
Vercel automatically creates a new production deployment.

For a small capstone project, Vercel deployment history and Git history provide the basic monitoring and rollback workflow.

Known Limitations
AI-generated plant-care information may not always be completely accurate.
The application does not replace professional horticultural advice.
The application currently relies on the Gemini API being available.
Plant-specific recommendations may vary depending on location, season, plant variety, and growing conditions.
The application does not currently store user care plans.
Future Improvements

Possible future improvements include:

Saving care plans for returning users
Adding plant image recognition
Adding reminders for watering and plant care
Providing location-aware seasonal recommendations
Adding more detailed plant profiles
Improving AI response streaming for faster perceived response time
Project Context

This project was created as the capstone project for the FlyRank Front-end AI Engineering Internship.

The project demonstrates frontend development, AI integration, accessibility, testing, error handling, performance auditing, deployment, and production-readiness practices.