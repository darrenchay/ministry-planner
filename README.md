# ministry-planner
# Notes for developers
- npm install after cloning and each time changing branches
- To start the app (whether server or client side) cd to the appropriate folder and then type 'npm run dev' in the command line
- Create a branch when starting a new part of development
- DO NOT PUSH TO MAIN DIRECTLY 
- When assigned a pull request, review the code to see if everything is ok then approve or add comments 
- Generally, the one who did the development on that branch will be the one merging 

## useful console git commands
- git clone 'url-of-git-repo.com' -> creates a local repository of the repo you cloned
- git add 'filename' -> adds that file to the list of files to be committed
- git commit -m "message" -> commits all the files you added with message "message"
- git push -> pushes changes to remote repository
- git branch 'branchName' -> changes the branch you are working on and goes to branch 'branchName'
- git checkout -b 'newbranchName' -> creates a new local branch and names this branch 'newBranchName'
