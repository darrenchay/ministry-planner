# ministry-planner
# Notes to developers
- DO NOT PUSH TO MAIN DIRECTLY 
- When assigned a pull request, review the code to see if everything is ok then approve or add comments 
- Generally, the one who did the development on that branch will be the one merging 
### Running a local instance of code
- npm install after cloning and each time changing branches
- Create a branch when starting a new part of development
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
