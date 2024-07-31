ProManage Application

This project includes a comprehensive task management application with the following features:

User Authentication: Users can register and log in to the application. Task creation is restricted to logged-in users.

Task Creation: Users can create tasks with properties like priority, optional due deadline, task list, and the ability to share tasks with other users. Shared tasks are publicly accessible with read-only access.

Profile Updates: Users can update their name or password from the settings page. Password updates require both the old and new password.

Task Analytics: Users can view analytics for all tasks created on the platform.

Task State Management: Users can manually move tasks between different states (backlog, todo, in-progress, done). Date Color Indicators: The due date color changes to green for completed tasks. If a task is moved back to todo, in-progress, or backlog, the due date color changes to red if the deadline has passed, or gray otherwise.
 
Task Deletion and Editing: Users can delete or edit tasks.

Task Filtering: Tasks can be filtered by today, this week (default), and this month. "This week" is defined as 7 days from today, and "this month" as 30 days from today.

Toast Messages: Toast notifications are used for various actions.

Mandatory Fields: While creating tasks, the title and priority fields are mandatory. The checklist and due date are optional. Mandatory fields are marked with a red asterisk (*).

Task Title Clipping: Task titles on the board page are clipped with ellipsis if they exceed a certain character limit. The full title is shown on hover via a tooltip or the title attribute.

Member Assignment: Users can add members to the board and assign them to different tasks.

Settings Page: The settings page pre-fills the user's name and email. Users can update their name, email, or password (old and new passwords required for password updates). After updating the email or password, the user is logged out.
