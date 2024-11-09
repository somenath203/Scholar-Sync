# Explanation of "/((?!api|\_next|static|$).\*)'"

## Ans:

Imagine you have a building with many rooms. There's a security guard who checks IDs before letting people enter rooms. Now:

1. Some rooms are public (no ID needed):

   - Main entrance hall (like your website's homepage '/')
   - Information desk (like '/api' routes)
   - Staff entrance ('/\_next' - Next.js stuff)
   - Storage room ('/static' - static files)

2. ALL OTHER rooms need ID check (authentication)

Now, let's understand what this regex does using room numbers:

```
/((?!api|_next|static|$).*)'
```

It's like giving instructions to the security guard:

"Hey guard!

- If someone goes to main entrance (/) → Let them in
- If someone goes to info desk (/api/...) → Let them in
- If someone goes to staff entrance (/\_next/...) → Let them in
- If someone goes to storage (/static/...) → Let them in
- BUT if they try to go ANYWHERE else → Check their ID!"

So if someone tries to visit:

- `/` (main entrance) → ✅ Allowed without ID
- `/dashboard` (private office) → 🚫 Need ID
- `/profile` (private room) → 🚫 Need ID
- `/api/auth` (info desk) → ✅ Allowed without ID

<br>

Imagine you have these URLs in your website:

```
/                 (homepage)
/dashboard        (private)
/profile          (private)
/api/auth/login   (public - needed for login)
/_next/image.jpg  (public - needed for Next.js)
/static/logo.png  (public - needed for static files)
```

Now, let's break down how our regex protects routes:

1. First Part: `(?!api|_next|static|$)`

   ```
   If URL starts with:
   - api    → DON'T protect it
   - _next  → DON'T protect it
   - static → DON'T protect it
   - $      → DON'T protect it (this means homepage '/')
   ```

2. Second Part: `.*`
   ```
   Everything else → PROTECT it
   ```

Let's test each URL:

```javascript
// Testing: /
// Is it api/_next/static? No
// Is it homepage ($)? YES! → DON'T protect

// Testing: /dashboard
// Is it api/_next/static? No
// Is it homepage? No
// Then → PROTECT IT!

// Testing: /api/auth/login
// Is it api/_next/static? YES (starts with api) → DON'T protect

// Testing: /profile
// Is it api/_next/static? No
// Is it homepage? No
// Then → PROTECT IT!
```

So basically:

1. First, it checks if URL starts with api/\_next/static or is homepage
2. If yes → Allow access (no protection)
3. If no → Protect it (need login)

That's why when you visit:

- Homepage (`/`) → Works without login
- Dashboard (`/dashboard`) → Asks for login
- Profile (`/profile`) → Asks for login
- Auth pages (`/api/auth/...`) → Work without login

<br>

Ah! Let me explain this step by step:

`(?!api|_next|static|$)`

1. First, understand that `?!` works with EVERYTHING inside the parentheses:
   - It's saying "don't match ANY of these"
   - It's not checking them one by one
   - It's like one big "NOT" for everything inside

So when you have:

```javascript
(?!api|_next|static|$)

It means: "Don't match if it's:
- api OR
- _next OR
- static OR
- nothing after slash ($)"
```

Let's test homepage '/':

```javascript
1. URL is '/'
2. After slash, there's nothing (that's what $ matches!)
3. Since ?! means "don't match these", and $ matches
4. Therefore, homepage is NOT protected
```

Let's test '/dashboard':

```javascript
1. URL is '/dashboard'
2. After slash, there's 'dashboard'
3. 'dashboard' is:
   - not 'api'
   - not '_next'
   - not 'static'
   - not nothing ($)
4. Therefore, it needs protection!
```

So `$` isn't being checked after the others - they're all being checked together as part of one big "don't match these" group!

The key is understanding that `?!` applies to everything inside those parentheses as one unit!

# Q) This is my prisma schema:

```js
model Profile {
  id                    String                  @id @default(uuid())
  fullName              String
  email                 String                  @unique
  profilePicUrl         String
  EssentialYoutubeLinks EssentialYoutubeLinks[]
}

model EssentialYoutubeLinks {
  id                                       String   @id @default(uuid())
  youtubeVideoName                         String
  youtubeVideoLink                         String
  youtubeVideoDescription                  String
  emailOfTheProfileWhoStoredTheYoutubeLink String
  userProfile                              Profile  @relation(fields: [emailOfTheProfileWhoStoredTheYoutubeLink], references: [email], onDelete: Cascade)
  createdAt                                DateTime @default(now())
  updatedAt                                DateTime @updatedAt
}
```

## now, in case of "EssentialYoutubeLinks", in case of this field: "userProfile Profile @relation(fields: [emailOfTheProfileWhoStoredTheYoutubeLink], references: [email], onDelete: Cascade)"

## the field key is "UserProfile" but when i pushed it to the neon database, then, it is showing Profile instead of "userProfile" in column name under "EssentialYoutubeLinks" ?

## Ans:

The reason this is happening is due to how Prisma handles naming conventions for relations and the automatic column naming it applies when defining relationships between models.

### What’s happening in your case:

In your Prisma schema, you have the following relationship defined in the `EssentialYoutubeLinks` model:

```prisma
userProfile Profile @relation(fields: [emailOfTheProfileWhoStoredTheYoutubeLink], references: [email], onDelete: Cascade)
```

Here, `userProfile` is the name of the field in the model `EssentialYoutubeLinks` that holds the relation to the `Profile` model.

Prisma will automatically generate the database schema based on the following rules:

1. **Field Name in the Model**:

   - The field name for the relation in your model (`userProfile`) refers to the **relationship itself**, which is a reference to the `Profile` model. This doesn't directly control the column name in the database, it just represents the relation in the Prisma model.

2. **Database Column Name**:

   - The column name in the database that holds the foreign key for the relation is generated automatically by Prisma based on the name of the field that represents the relationship, but with the following rules:
     - It will use the **name of the related model** (in this case `Profile`) in lowercase as the name for the foreign key column.
     - So, even though you have `userProfile` in the schema, Prisma will automatically create the foreign key column name as `profileId` (using the name of the related model, i.e., `Profile`).

3. **Prisma's Naming Convention**:
   - In Prisma, the name of the column that holds the foreign key is often derived by combining the model name (`Profile`) with `Id` (i.e., `profileId`).
   - In your schema, Prisma creates the foreign key as `profileId` because it's referencing the `Profile` model.

### Why does this happen?

This is simply due to **Prisma's default behavior** in generating foreign key columns:

- The foreign key column is automatically named using the lowercase form of the related model name (`Profile`), followed by `Id`. This is why you see the column name `profileId` in the database instead of `userProfile`.

### How Prisma Determines the Column Name:

- **Relation Field Name**: The field in your schema, `userProfile`, is just the name of the relationship in the model.
- **Foreign Key Column Name**: The column that stores the foreign key will be automatically named by Prisma. By default, it combines the lowercase name of the related model (`profile`) with `Id`, making it `profileId` in this case.

### How to Control This Behavior:

You cannot directly control the **foreign key column** name unless you use the `@map` attribute on the field itself. Prisma will always generate the column name based on the related model's name.

However, if you don't want to change this and are just experimenting, you should know that:

- **Field Name**: `userProfile` is the name of the relation field in the `EssentialYoutubeLinks` model.
- **Foreign Key Column**: In the database, it will be named `profileId` (since it refers to the `Profile` model).

### Conclusion:

- **Why it's happening**: Prisma auto-generates the foreign key column as `profileId` because it uses the lowercase form of the related model's name (`Profile`) and appends `Id` by default. This is an automatic convention Prisma follows when defining relationships between models.
