# **App Name**: TikTok Task Rewarder

## Core Features:

- Profile Screen: Display user profile data from 'users' collection, including username, coins, followers, following, and the last 5 tasks from the 'historico' collection.
- Task List: Display available tasks from the 'tarefas' collection, filtered by 'active' status.
- Order Placement: Allow users to make requests for followers/likes by spending coins, creating a new entry in the 'pedidos' collection.
- Task Completion Logic: Simulate the completion of a task (follow, like, comment) when the user interacts with it, verifying if the task is completed and updating coins and 'historico'.
- Order Creation Logic: When the user requests a service like followers, verify coin balance, subtract coins, create the order in 'pedidos', and notify the user.
- Unique Invite Codes: Use generative AI to create unique invitation codes (codigo_convite) for each user in the 'users' collection.
- Referral System Logic: Apply logic for referral bonus when a new user signs up with a referral code (codigo_convite), crediting coins to both the new user and the referrer.

## Style Guidelines:

- Primary color: #7289DA (a muted purple) to evoke a sense of calm and trustworthiness, aligning with the management of virtual currency; this contrasts well with both light and dark backgrounds.
- Background color: #F0F2F5 (very light gray) for a clean and modern aesthetic, suitable for a light color scheme.
- Accent color: #FF4081 (a vivid pink) for call-to-action buttons and highlights to draw user attention.
- Body and headline font: 'Inter', a sans-serif font for a clean and modern look.  The font is suitable for both headlines and body text.
- Use simple, minimalist icons to represent task types and actions.
- Employ a grid-based layout for a structured and organized presentation of tasks and user data.
- Incorporate subtle animations on task completion and coin updates to provide positive feedback to the user.