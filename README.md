Assessment Task: Employee Leave Management System (Frontend)

### Requirement of Assignment
seperate dashboard for both employee and manager with some details for quick overview of leave requests.

auth with jwt 

two type of users: Employee and Manager. 

employees can apply for leave and view their leave history, 
edit or delete pending leave requests -> only pending request can be delete or edit,
each leave should have 
leave type -> Sick Leave, Casual Leave, Paid Leave, Unpaid Leave something similar,
start date -> which should be after today 
end date -> which should be after start date
reason -> reason for leave

employees can view their leave history, including the status of each request (Pending, Approved, Rejected),

while managers can view all leave requests and approve or reject them.

manager dashboard requirement 
view all leave requests
filter requests by employee, leave type, or status
approve or reject pending requests
total leave requests, pending requests, approved requests, and rejected requests should be displayed on the dashboard for quick overview. ->should be clean, interactive and clickable to view the list of requests in that category.

Technical Expectations
Your solution should demonstrate:
Clean folder structure
Reusable components
API abstraction -> simple to use
Responsive design
Proper state management
Loading, empty, and error states
Form validation
Clean and maintainable code
rtk redux -> state management and rtk query

Bonus (Optional)
If time permits, you may also include:
Dark mode
Charts or analytics
Skeleton loaders
Optimistic UI updates
TypeScript

Submission Instructions
1. Create a new public GitHub repository for this assignment.
2. Commit your work with meaningful commit messages throughout development.
3. Include a README containing:
Project overview
Setup instructions
Environment variables (if applicable)
Any assumptions you made during implementation
4. Reply to this email with:
Your GitHub repository link
Your full name
Submission Deadline: Sunday, 19th July 2026 . @ 1:00 PM 

Note: The requirements intentionally leave some implementation details open. You are encouraged to make reasonable design decisions and document your assumptions in the README. We are interested in understanding how you think through user experience, component architecture, and application structure—not just the final interface.

