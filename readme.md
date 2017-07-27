### Memento

>_ **_Memento_** is an app designed to keep track of memories and experiences on the go. Aided with location services, your favorite memories at the most special places will never be forgotten!

[Click here for app demo](https://blooming-plateau-49350.herokuapp.com)

### ERD

![](/readme_images/ERD.png)

### User Flow Diagram

![](/readme_images/userflow.png)

### Development

##### Models

| Model #1: User       | Model #2: Journals     |
| -------------------- |:----------------------:|
| name                 | name                   |
| email                | location               |
| password             | text                   |
| journals (ref)       | --                     |

##### Routes

| userRouter   | journalRouter    |
| ------------ |:---------------: |
| ('/')        | '/journals')     |
| ('/signup')  | ('journals/:id') |
| ('/profile') | --               |
| ('/login')   | --               |
| ('/logout')  | --               |

##### Controllers

| usersController        | journalsController   |
| ---------------------- |:--------------------:|
| register (.get)        | index (.get)         |
| create (.post)         | show (.get)          |
| show (.get)            | create (.post)       |
| logout (.get)          | update (.put)        |
| authenticatedUser      | destroy (.delete)    |
