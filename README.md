# Tinder Clone

## Project Description

### Origin

This is full-stack practice inspired by Ania Kubow's [tutorial](https://www.youtube.com/watch?v=Q70IMS-Qnjk&t=3037s).
Modifications were made based on module mindset. In the respect of frontend, I extract out the CRUD logic to make the code more clear. While in backend, I separated the code into route-controller-service-database logic.

### Overview

In this project, you can create your own account or log in an already existed account by username and password.

After account created or logged in, profile cards are displayed according to your gender-tendency selection. You can swipe right your favorite profiles and make matches.

If a profile is in your matched list, you can click his/her profile photo to start a chat.

![Homepage UI](https://raw.githubusercontent.com/PapayaHUANG/images/main/img/%E6%88%AA%E5%B1%8F2022-10-11%2012.32.15.png)
Homepage UI

![Create Account UI](https://raw.githubusercontent.com/PapayaHUANG/images/main/img/%E6%88%AA%E5%B1%8F2022-10-10%2021.43.37.png)
Account creating page

![Match and Profile display](https://raw.githubusercontent.com/PapayaHUANG/images/main/img/%E6%88%AA%E5%B1%8F2022-10-10%2021.44.02.png)
Match and Profile display

![Chat display](https://raw.githubusercontent.com/PapayaHUANG/images/main/img/%E6%88%AA%E5%B1%8F2022-10-10%2021.44.20.png)
Chat display

### Technologies Used

1. Frontend

- **Axios** for CRUD data from backend.
- **React-cookie** to store user token.
- **react-tinder-card** for card swiping animation.

2. Backend

- **JWT** for authentication.
- **bcrypt** for password and user id encryption.
- **Middleware** for transfer data into JSON format.

3. Database

- MongoDB
- Mongoose

## Update Schedule

- More complex user authentication logic to be implemented.
- lazy-loading of profile image.

## Live Demo

[Check it out!](http://shaoyahuang.site/Tinder-Clone/)
