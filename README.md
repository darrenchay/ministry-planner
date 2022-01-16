# ministry-planner
# Notes to developers
- DO NOT PUSH TO MAIN DIRECTLY 
- When assigned a pull request, review the code to see if everything is ok then approve or add comments 
- Generally, the one who did the development on that branch will be the one merging 
- Check trello board frequently for task and story updates
### Running a local instance of the code
- Create a branch from main when starting a new part of development
- npm install after branching to new branch (or when cloning for the first time)
- copy the 2 env files from the channel and paste it in the appropriate folders (client and server)
- To start the app cd to the appropriate folder (client/server) 
  - Type 'npm run dev' in the command line to start running the server side
  - Type 'npm start' in the command line to start running the client side

## useful console git commands
- git clone 'url-of-git-repo.com' -> creates a local repository of the repo you cloned
- git add 'filename' -> adds that file to the list of files to be committed
- git commit -m "message" -> commits all the files you added with message "message"
- git push -> pushes changes to remote repository
- git branch 'branchName' -> changes the branch you are working on and goes to branch 'branchName'
- git checkout -b 'newbranchName' -> creates a new local branch and names this branch 'newBranchName'


### Updating heroku server
1. cd to server
2. add and commit changes there and git push heroku master 