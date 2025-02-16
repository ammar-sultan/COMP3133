# GraphQL Queries and Mutations

## 1. Basic Welcome Query

```graphql
query {
  welcome
}
```

## 2. Greet with Parameter

```graphql
query {
  greet(name: "John")
}
```

## 3. Get Single User

```graphql
query {
  user(uid: 1) {
    uid
    fnm
    lnm
    salary
  }
}
```

### With Variables

```graphql
query GetUser($userId: Int!) {
  user(uid: $userId) {
    uid
    fnm
    lnm
  }
}
```

#### Variables:

```json
{
  "userId": 1
}
```

## 4. Get All Users

```graphql
query {
  users {
    uid
    fnm
    lnm
    salary
  }
}
```

## 5. Add New User

```graphql
mutation {
  addUser(uid: 3, fnm: "Sarah", lnm: "Connor", salary: 85000.50) {
    uid
    fnm
    lnm
    salary
  }
}
```

### With Variables

```graphql
mutation AddUser($input: AddUserInput!) {
  addUser(
    uid: $input.uid
    fnm: $input.fnm
    lnm: $input.lnm
    salary: $input.salary
  ) {
    uid
    fnm
    lnm
  }
}
```

#### Variables:

```json
{
  "input": {
    "uid": 4,
    "fnm": "Mike",
    "lnm": "Tyson",
    "salary": 120000
  }
}
```

## 6. Combined Query with Fragment

```graphql
fragment UserInfo on User {
  fnm
  lnm
  salary
}

query {
  welcome
  users {
    ...UserInfo
    uid
  }
  user(uid: 1) {
    ...UserInfo
  }
}
```

## 7. Error Testing (Expected Failures)

```graphql
# Duplicate UID
mutation {
  addUser(uid: 1, fnm: "Duplicate", lnm: "User", salary: 0) {
    uid
  }
}

# Negative Salary
mutation {
  addUser(uid: 5, fnm: "Test", lnm: "User", salary: -100) {
    uid
  }
}

# Missing Required Field
mutation {
  addUser(uid: 6, fnm: "Incomplete") {
    uid
  }
}
```

## 8. Complex Query with Aliases

```graphql
query {
  firstUser: user(uid: 1) {
    ...UserFields
  }
  secondUser: user(uid: 2) {
    ...UserFields
  }
  allSalaries: users {
    salary
  }
}

fragment UserFields on User {
  uid
  fnm
  lnm
}
```
