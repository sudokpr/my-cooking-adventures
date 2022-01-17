---
layout: PostSimple
title: Another blog edited on CMS
summary: This is the 2nd blog edited directly on CMS with support of multiple
  tags and images. This shouldn't fail the build and also no fixes required on
  the .md file for tags and images. The author field also has been removed.
tags:
  - CMS
  - List
date: 2022-01-15T07:22:01.305Z
images:
  - /static/images/3pin-adaptroe.jpg
---
# The 2nd blog edited on CMS

This is the 2nd blog edited directly on CMS with support of multiple tags and images. This shouldn't fail the build and also no fixes required on the .md file for tags and images. The author field also has been removed.

I have a _redirects file with the following rule:

`/api/v1/* https://backend.com/api/v1/:splat 200!`

When we make a request to the backend directly for example `https://backend.com/api/v1/movies` the request succeeds without any issues whereas `https://frontend.com/api/v1/movies` throws 500 error.

Is there a way to know what’s causing this issue?

Here are a few of the **nf-request-id**s for the failed requests

1489f94a-4ada-4b75-a790-b4ea192b39be-175696389\
6387d2fe-488e-4315-b0f5-7464a6c2eab2-22014378\
6387d2fe-488e-4315-b0f5-7464a6c2eab2-2201928

## The level 2 header

When we make a request to the backend directly for example `https://backend.com/api/v1/movies` the request succeeds without any issues whereas `https://frontend.com/api/v1/movies` throws 500 error

> This should have any quotes or references

![bat](/static/images/bat-2639114_1280.jpg "bat")

* bullet 1
* bullet 2
* bullet 3

1. list 1
2. list 2
3. list 3

[google.com](google.com)

*The italics*

***THe bot italics***

![cake](/static/images/cake-heart.jpeg "heart")