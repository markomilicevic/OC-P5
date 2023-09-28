# OC-P5 (Print-It WebSite v.1)

## About

Here is the P5 exercise of the Web Integrator course at OpenClassrooms

![](https://user.oc-static.com/upload/2022/06/17/16554564334118_FR_1148_P6_Banner-Printit.png)


## Constraints

- Follow the exercise rules on the OpenClassrooms website
- JavaScript only (except two lines of HTML and **nothing more allowed**)
- Only features treated in the P5 course are allowed (for example: scoping or classes are not allowed)

## Features

- Git versionned ([Git SCM](https://git-scm.com/))
- GitHub social coded using **Fork** & **Pull Request** features ([GitHub](https://github.com/))
- HTML5 valid ([W3C Markup Validation Service](https://validator.w3.org/))
- JavaScript **slider component**:
  - Left arrow
  - One dot per slide
  - Right arrow
  - Navigation trough arrows and dots
  - Possibility to have several sliders per page

## Trick

In order to remove the clickable cursor over the current slide's dot, and because CSS modifications are not allowed, was found that:
- Removing the `href` attribute from `<a>` is rendering the default cursor
- An `<a>` element without the `href` attribute is still valid in HTML5
