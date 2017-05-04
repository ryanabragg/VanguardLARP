# Overview

Revamp the website into a single-page model, with a future goal of a character edit interface. The page should focus on new users being able to clearly understand how to access the rules and direct them to the facebook group for questions.

# Functional Description

## Homepage

The website provides a single page showing all relevant information as the user scrolls down.

* Web page sections:
  - Header
  - Welcome message/introduction
    + Story introduction
  - Schedule
  - Location/directions to next event
  - Rules information/link
    + Character edit link when available
  - Contact information
    + Facebook group link
  - Footer
* The site is simple enough that navigation is accomplished by scrolling.

The character editing interface mimics the printed character sheet as a display (adjusted when on lower viewports) with a touch friendly method for viewing skill descriptions and requirements without navigating away from the page. Idealy, a character can be saved in some manner, and a user should be able to share it with others using a link. Clicking on the link would open a new browser window/tab with the character displayed as the original user saw it at the time the link was generated.

## Character Edit

* Two possible initial states:
  - Blank: Link from homepage or otherwise lacking data.
  - Built: The link included the required information for loading up a preset of skills learned. Those skills are enabled in the interface.
* Editing state:
  - The user can now add or remove skills and change names and other variables.
  - Any callouts about the current configuration of skills are displayed. Examples are:
    + Insufficient build
    + Requirements not met
    + Plot approval or action required (mostly for the addition of certain skills)
    + Reset build spent
    + Reset character (build spent plus race)
    + Print
    + Share via link
* Print state:
  - The character sheet omits any extranious formatting in order to have it print cleanly. Idealy it prints to a single page.
  - Optionally print skill descriptions.

## Maintaning Data

* Single page to perform CRUD actions on.
  - Schedule
  - Locations
  - Ability
  - Race
  - Racials

# User Stories

## Visitor

As a visitor, I want to know more about the game so that I can decide on playing.

As a visitor, I want to contact others so that I cna learn details about playing.

## Player

As a user, I want to know when the next event is and where so that I can schedule my time.

As a user, I want to access the rules so that I can learn how to play and design a character.

As a user, I want an interface through which I can create a character.

## Administrator

As an administrator, I want to be able to log in to edit data.

As an administrator, I want to update the schedule so that players know when events will happen.

As an administrator, I want to add details to a location so that players have an easier time arriving at events.

As an administrator, I want to add or remove abilities so that character design reflects the rules changes.

As an administrator, I want to update the abilities so that characters are designed with the current rules.

# User Interface

## Brand Guidelines

This is a creative/marketing document that describes and dictates the correct way to represent the brand. This can include a Style Guide that provides logo usage, color palettes, font styles, graphics, etc.

## Sitemap

Diagram of relations between the web pages based on navigation and controls.

## Wireframes

These are simple, blocky representations of website pages, devoid of graphics or color. A wireframe indicates key content and functions required on a page.

* Each control, including states (enabled/disabled/highlighted) and operations.
* Supported orientations and transitions between them.
* Functionality represented.
* Error handling.
* Dimensions and constraints.

## UX Recommendations

This document is generally prepared by a usability expert who has knowledge of best practices within website design and has researched the client’s industry. The document spells out the best method to engage visitors to achieve the website’s business goals.

# Technical Brief

This document is prepared by the Technical Project Manager. It covers the hardware requirements such as the hosting environment, type of server, application framework, database structure, and lists website components, 3rd-party applications and plugins.

# Creative Brief

The website project’s Art Director or Creative Director will prepare the Creative Brief after meeting with the client and/or the client’s marketing staff. The businesses branding and how it will be represented within the website is a key component along with the types of graphics, color palette, and photography that will need to support the brand. A Creative Brief should also address the target audience(s) and what will appeal to them.

## Marketing Strategy

The marketing strategy is based on the client’s business goals. There are general best-practices that should be observed for any website but beyond that, there is no “one-size-fits-all” solution.

# Project Timeline

The timeline shows the various project phases broken up into sections that include milestones for deliverables and client approvals. Timelines may be merged with Resource Allocations, which is a list of the required staff for each phase.

## Milestones

1. Initial project meeting
  * Rough estimate of the scope and time/cost of the website.
2. Requirements Investigation
  * Refined estimate.
3. Timeline Planning
4. Facade Application showing screen and with temporary transitions and example images/text
5. Communication Protocol: application connects to network/server
6. Functional Milestone 1:
  * ...
7. Functional Milestone 2:
  * ...
8. Alpha Application (with full functionality)
9. Stability
10. Release