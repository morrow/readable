# Readable

This is a react/redux powered application.

Features:
- Posts
  - Create a new post
  - Edit an existing post
  - Delete an existing post
  - Upvote a post
  - Downvote a post
  - Sort Posts by date, score, # of comments
- Comments
  - Make a new comment
  - Edit an existing comment
  - Upvote a comment
  - Downvote a comment
- Categories
  - Categories are automatically generated from post categories

Available routes:

    / # index

    /posts # index of posts
    /posts/new # create new post
    /posts/:post_name # view individual post
    /posts/:post_name/edit # edit individual post
    /posts/:post_name/delete # delete individual post

    /categories # index of categories
    /categories/:category_name # view individual category

    /user # view current user
    /users/:user_id # view individual user



This application uses a backend Node.js server which acts as a redux style reducer to implement global state changes. Relevant user actions are sent to the server via middleware and then the server reduces these actions to it's own global shared state, which is then synced across browsers via XHR polling. This is made simpler by having the client poll a route called 'sync' which serves a MD5 hash of the global state. The client will only download the new state if this hash differs from the latest state hash received (AKA global state is different from local state). Actions are also saved to an append-only log file which the server uses to reconstruct state when re-started by simply re-playing the actions. To start over with blank state, simply erase the contents of src/db/actions.log and restart the server.
