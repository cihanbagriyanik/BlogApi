## Blog Api Project

### ERD:

![ERD](./erdBlogAPI.png)

### Folder/File Structure:

```
    logs/
    src/
        configs/
            dbConnection.js
            swagger.json
        controllers/
            user.js
        helpers/
            passwordEncrypt.js
            sendMail.js
            sync.js
        middlewares/
            authentication.js
            errorHandler.js
            findSearchSortPage.js
            logger.js
            permissions.js
        models/
            token.js
            user.js
        routes/
            auth.js
            document.js
            token.js
            user.js
    .env
    .gitignore
    index.js
    package.json
    readme.md
    swaggerAutogen.js

```