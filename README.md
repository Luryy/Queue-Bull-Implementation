<h1 align="center">Bull Implementation :ox: </h1>

_This project have the implementation of_ [Bull - queue system](https://optimalbits.github.io/bull/) _and a interface to administrate your jobs_ - [Bull-Board](https://github.com/vcapretz/bull-board)

> Deprecated description

### Starting

You should have [docker](https://www.docker.com/) instaled


- Create a redis container:
```
docker run --name redis -p 6379:6379 -d -t redis:alpine
```

- Clone the project:
```
git clone https://github.com/Luryy/Queue-Bull-Implementation.git
cd Queue-Bull-Implementation
yarn install
yarn start
```

### Usage

The aplicacation have two routes:


- **```GET /admin/queues```** - To see the dashboard that administrate your jobs.

- **```POST /bull-test```** - To create a new job for test. The body must containt **```teste```** with any data, just to be passed to job.


  #### Job

  * When you send the request you must have one log after 1 second and other after 15 seconds, then you job will be done.
  * If your aplication crashes before your job finish, when you restart, the job will be retried.
  * If want to change the behavior of the job, see next topic **structure**.



### Structure

Here is the project structure:

```
├── node_modules
├── src
│   ├── jobs
│   │   ├── index.ts
│   │   └── TestJob.ts
│   ├── providers
│   │   └── QueueProvider
│   │       ├── fakes
│   │       │   └── FakeQueueProvider.ts
│   │       ├── implementations
│   │       │   └── BullQueueProvider.ts
│   │       └── models
│   │           └── IQueueProvider.ts
│   ├── app.ts
│   └── server.ts
├── .editorconfig
├── .eslintignore
├── .eslintrc.json
├── .git
├── .gitignore
├── package.json
├── prettier.config.js
├── README.md
├── tsconfig.json
└── yarn.lock
```
At **Providers** folder we have the bull implementation, with his interface and fake implementation to future tests.

At **Jobs** folder will contain all jobs as we want, you could only duplicate **TestJob.ts** (remember to export at index.ts).
If you want to alter the job behavior, you should change the function ```handle``` to do whatever you want.



To a better understanding you should open the files and see yours responsabilities.


### Dashboard

![Screenshot from 2020-11-18 15-00-53](https://user-images.githubusercontent.com/59494158/99569073-efd9aa80-29ae-11eb-85d7-9fe7d9182ce1.png)

![Screenshot from 2020-11-18 15-01-06](https://user-images.githubusercontent.com/59494158/99569069-eea87d80-29ae-11eb-99ac-8a02326e6a0c.png)

## Autor

👤 **Lucas Yuri**

- Github: [Luryy](https://github.com/luryy)
- LinkedIn: [Lucas Yuri](https://linkedin.com/in/lucas-yuri)


## 📝 License

Copyright © 2020 [Lucas Yuri](https://github.com/luryy).
This project is [MIT](LICENSE) licensed.


