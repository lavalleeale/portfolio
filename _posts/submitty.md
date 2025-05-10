---
title: 1 year with Submitty
date: 1746851956608
---

## What is Submitty?

Submitty is many things and I am not going to try to explain it all here. There are however a few parts that I have worked on that I will explain here. A basic overview of Submitty is that it is a large open source project that is used by many universities to help with grading. It is primarily used for autograding, but there are many other features that it has. Some of the main features are:

- Submitting assignments
- Grading assignments
- Viewing grades
- Asking questions on the discussion forum
- Downloading course materials
- Viewing autograding results

## What have I worked on?

### The TA Grading Interface

Submitty is primarily used for autograding, but of course there will always be a spot for human grading, whether it be a handwritten exam or partial credit. My main focus has been on improving the experience for TAs when grading. This includes:

- Adding Live Status Indicators so that a TA can see if another TA is grading the same submission, preventing a lot of version conflicts (two grades for the same submission) and confusion.
  - This had a lot of changes, the first step of which was to migrate the existing rubric javascript from using raw Promises with `.then` and `.catch` to using async/await. This was a big change as it allowed for a lot of the code to be simplified and made it easier to read.
  - The next step was a database migration to add a new table to store which TAs have which submissions open.
  - The final part was adding both backend routes to fetch who is grading what and the frontend code to display it. There are certain times during grading where multiple TAs actually want the same submission open, so balancing how vital this feature is with the fact that it is not always a needed warning was an interesting UX challenge. The final iteration prioritizes the harm of having two TAs grading the same submission over the harm of having a TA see a warning when they are not actually grading the same submission.
- Submitty already had the ability to scan a stack of exams and split them into individual submissions, but the last student who had worked on it graduated but still had to be called in with certain high severity issues. My main goal with this refactor was adding stability
  - This step is completed but hopefully if I make a year 2 post I will be able to talk about automatically redacting personal data from exams as well.

### Architectural Changes

Submitty just had its 11th birthday and therefore there are many parts of the codebase that are unmaintained or outdated. My main focus has been on updating the codebase to be more modern and easier to work with. This includes:

- Finishing a long term idea to integrate Vue into our existing Twig templates. Finding a way to use both frameworks together was a challenge, but modernizing the codebase was a big goal of mine.
- Updating database columns to properly use null rather than empty strings. This was a complex task as there were many pieces of code that were relying on the fact that the database would return an empty string rather than null.
  - The first step in this process was to allow all code reading from the database to treat null as an empty string. This allowed us to insert mixed values into the database without breaking anything.
  - The next step was updating the code that wrote to the database to use null rather than empty strings. One of the most difficult parts of this was that Submitty can automatically pull data from our registrar and insert it into the database. This meant that people not normally on the Submitty team would be affected by this change. It required a lot of testing and communication with RPI's technology services team to make sure that this change would not break anything for them.
  - The final glory step was to add a database migration to add a non-empty constraint to the database. This migration took a long time to run and was a big risk, but it was a big goal of mine to make sure that the database was in a good state. I am happy to say that it worked and we were able to remove the code that was treating null as an empty string.

### Security

Submitty is a large codebase and therefore there are many security issues that need to be addressed. Some of my work has been on updating the codebase to be more secure. This includes:

- Finding many places in which request parameters were not being sanitized. This happened in some critical places, such as the grading interface. Properly checking if a user was allowed to view a submitter's name was one of the most important security issues I found. This meant that anyone with access to the grading interface could see the names of all students in the course and the grades they got on any assignment they are allowed to grade. This was a big issue and I am happy to say that it is now fixed.

## Conclusion

I have been working on Submitty for a year now and I am happy to say that I have made a lot of progress. I am excited to continue working on it and hopefully make it even better. I am also excited to see what the future holds for Submitty and how it will continue to grow and evolve. This has been my first time working on a real project with defined deadlines and a large team. I of course had used git and github before, but there are just some things that you can only learn by working on a real project.
