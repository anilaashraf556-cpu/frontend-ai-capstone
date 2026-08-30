Workflow Comparison
Round 1 (Vague Prompt)
In Round 1, I gave the AI a simple and vague prompt to create a settings form. The generated form was functional but very basic. It contained only a few settings options and did not include validation for user input. There was no styling to improve the appearance, and the overall interface looked plain. The form also lacked important features such as a reset button, profile photo upload, and a change password section. The email field accepted any text because there was no validation for the correct email format. It was also not displaying any message if user does not enter name or email.
Round 2 (Precise Prompt)
In Round 2, I used a detailed prompt with clear requirements and constraints. The generated settings form was much more complete and user-friendly. It included more settings options, a better layout, and improved styling. The form also contained additional features such as a profile photo section, a change password section, and a reset button. Overall, the second version was more polished and closer to a real application.
Correctness
The second version was more correct because it followed the detailed requirements given in the prompt. It required the user to enter both the name and email before saving the settings. It also validated the email format, making the form more reliable than the first version.
Accessibility
The second form was easier to use because it had a cleaner layout and more organized sections. The additional styling made the interface clearer and more readable for users.
Edge Cases
The second version handled important edge cases that the first version ignored. It prevented users from saving the form without entering the required name and email fields. It also checked that the email followed a valid format before allowing the settings to be saved.
Review Effort
The first version required more manual review because many important features were missing. The second version still needed testing, but it required less effort because the AI followed the detailed instructions more accurately.
AI Mistake I Caught
One mistake I noticed was that the first AI-generated version did not include input validation, proper styling, or several important settings features. I had to identify these missing requirements by comparing both versions. In second version color of both buttons were different which was corrected later. This showed me that vague prompts often produce incomplete results, while detailed prompts generate much better and more accurate code.
