# Dev.to - Clone Project Plan

## Project Setup
- [x] Initialize project using create-t3-app stack
- [x] Set up version control with GitHub
- [x] Deploy initial application to Vercel
- [x] Set up Prisma with Railway for SQL database storage
- [x] Configure NextAuth for authentication
- [x] Set up AWS S3 for file uploads - https://devto-clone.s3.amazonaws.com/

## Week 1
### Authentication
- [x] Implement user login/signup with credentials
- [x] Implement social login (Google)
- [x] Implement social login (Discord)
- [x] Implement user logout

### Blog Creation Page
- [x] Design and implement initial layout for blog creation page
- [x] Create basic form for blog post creation (title, tags, content)

### Deployment
- [x] Ensure application is accessible via public Vercel link - devto-clone-ed.vercel.app

## Week 2
### AWS S3 Setup
- [x] Create and configure AWS S3 bucket
- [x] Implement file upload functionality to S3

### Blog Post CRUD Operations
- [x] Create tRPC routes for blog post operations
- [x] Implement create blog post functionality
- [x] Implement read blog post functionality
- [ ] Implement delete blog post functionality (for post owners only)
- [x] Create blog post page (/new)
- [x] Display list of blog posts on home page

## Week 3
### User Profile
- [x] Create user profile page (/user/[userId])
- [x] Implement profile information editing
  - [x] Add bio field
  - [x] Implement profile picture upload to AWS S3
  - [x] Display list of user's blog posts on profile

### Search Functionality
- [ ] Implement blog search box on home page
- [ ] Create search functionality to find blogs by title

## Week 4
### Blog Post Management
- [ ] Implement edit functionality for blog posts
- [ ] Add hide/archive feature for blog posts
- [ ] Create indicator for hidden/archived posts

### UI Improvements
- [ ] Ensure responsive design across devices
- [ ] Refine user experience and overall design
- [ ] Implement consistent styling using Tailwind CSS

## Week 5
### Additional Feature (Choose One)
- [ ] Implement commenting system
  - [x] Allow users to leave comments on blog posts
  - [ ] Add like functionality for comments
  - [ ] Implement comment reply feature
- [ ] OR Implement tags and categories
  - [ ] Allow users to add tags/categories to blog posts
  - [ ] Create search functionality for tags/categories
- [x] OR Implement Markdown support
  - [x] Add Markdown parsing for blog post content
  - [x] Create Markdown preview feature in blog editor

## Ongoing Tasks
- [x] Conduct weekly check-ins (every Thursday)
- [ ] Update project documentation as needed
- [x] Perform code reviews and refactoring
- [x] Test application thoroughly on different devices and browsers

## Final Steps
- [ ] Conduct final testing and bug fixes
- [ ] Prepare project handover documentation
- [ ] Schedule final project review meeting