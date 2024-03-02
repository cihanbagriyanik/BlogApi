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
            auth.js
            blog.js
            category.js
            token.js
            user.js
        helpers/
            dateToLocaleString.js
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
            blog.js
            category.js
            token.js
            user.js
        routes/
            auth.js
            blog.js
            category.js
            document.js
            token.js
            user.js
    .env
    .gitignore
    index.js
    package-lock.json
    package.json
    readme.md
    swaggerAutogen.js

```
