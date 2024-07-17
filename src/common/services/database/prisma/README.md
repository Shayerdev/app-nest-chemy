# Prisma guide

### Generate prisma

Enter command in root project for generate prisma client
```shell
npx prisma generate --schema=./src/common/services/database/prisma/client/schema.prisma
```

### Create your first migration by your model

```shell
 npx prisma migrate dev --name init  --schema=./src/common/services/database/prisma/client/schema.prisma
```
### Open Prisma studio

```shell
 npx prisma studio --schema=./src/common/services/database/prisma/client/schema.prisma   
```
