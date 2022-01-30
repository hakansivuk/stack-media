# Stack Media

I collaborated with my dear colleagues [Talha Sen](https://github.com/talhasen123 "Talha's Github"), [Cevat Aykan Sevinc](https://github.com/cevataykans "Cevat's Github"), [Yusuf Nevzat Sengun](https://github.com/ynsengun "Yusuf's Github") to accomplish this project. As a team, we were one of the few groups among 15 to implement all the required functionalities and one bonus functionality. We used the **React** library for our frontend, **Node.js** for our backend and **MySQL** for our database.

**Stack Media** is an implementation of a media services data management system (MSDMS, such as Netflix) for applying the theory learned in the course and observing real database design practises. Essentially, the project simulates a Netflix like platform where users can interact with media. There are two types of users: a normal user who could interact with the media and an admin user who can create or manipulate media.

A normal user, after signing up or logging in, can watch media and rate them. They can create channels to save their media. They could search for any media they want to watch and sort them according to their preference of date interval, genre, name or the time they are created. They can add other users as friends. Users can state their genre to get a variety of media suggestions on their channels or while watching media. They can leave feedback on any media they watch. Users can also create parties. They can invite their friends to the party. This way, users can watch the media together with their friends.

An admin user can create and upload a new movie or a new tv show/episode as new media. They can also edit existing media created by them or delete them. Admin users, as if a normal user, can search their media created by them and sort them accordingly.

I would suggest you to dive into our **Design Report** to observe how we have designed our DBMS. You could find the **User's Manuel** inside **Final Report**.

## Reports

* [Proposal Report](https://docs.google.com/document/d/1YKSLNEJh3Id7o9RNbmQU_o08PUxBJzC2IzhkB1JRdsg/edit?usp=sharing)
* [Design Report](https://docs.google.com/document/d/1mm-Ebh5BdCNxNBv6mmtWWuYigF31PSd0lQpefB0xR0w/edit?usp=sharing)
* [Final Report](https://docs.google.com/document/d/11fPr1L_e6Lt1KPPkPYjzcZpIJl7HNQqmtoOlRtE7E2M/edit?usp=sharing)

## How to install

```bash
npm run setup
```
It should install all the dependencies.

## How to run

```bash
npm start
```

Server would be automatically launched and the website will be ready to go!
