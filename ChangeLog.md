# Changelog 
The format is based on Keep a Changelog. Starting at version 1.0.0 ##[Unreleased]

# [1.1.4] - 2019-08-21
@(github.com/squish9696)
 
# Changed
- userprofile .html/js/css and userprofileregister .html/css/js to include skeleton functionality to update user profile.

# [1.1.3] - 2019-08-17
@(github.com/wetcrix)

# Added
- Users can now view their applications in the list-container <div>. Linked to jobpage similarly to joblist
 
# Changed
- Changed ID for div containing the list of files uploaded

# [1.1.2] - 2019-08-15
 @(github.com/wetcrix/)
# Added

- Batch proceesing of dealing with applications
 - Radio button for each applicantion
 - Accept and decline button to accept/decline changes and update database where applicable
- Applications sorted by Pending, Shortlisted and Declined

# Changed

- Checking database for previous applications for jobs when displaying joblist. Changed to suit new database structure


# [1.1.1] - 2019-08-08

# Added 
 - jobpage.html/css/js (@wetcrix). Added before 1.1.0.
  - Can click on the job's name and view a grid with its details in another tab
 - joblist.js
  - Added an applicationStatus to the Jobs/doc/application collection to track application progress
  
# Changed
  @wetcrix
 - employerjoblist.js 
  - Changed the fetching fo documents so that only jobs the employer posted shows. 
  - Viewing of the number of applicants 
  - Viewing the applicant(s) data in a collapsable <grid>
 
 # Removed
- No items removed

# [1.1.0] - 2019-04-08

 # Added
   - no items added

 # Changed
   @sashajsingh
 - job page styling
 
  @simeon9696
 - added password reset functionality - login.js
 - fixed styling to center content in landing form - index_style.css
 - added new directories when creating an account - index.js
 - added updated dependancies to jobpage.html
 - gave each page a unique title - .html
 - fixed issue with email where jobName was 'null'
 
 # Removed
- No items removed

# [1.0.9] - 2019-03-08

 # Added
   - no items added

 # Changed
   @simeon9696
 - updated admin metric style
 - fixed error in joblist.js with 'apply' not showing up in button unless a user was logged in (again)
 - index.html added keywords for SEO
 - added alt text to img tags in authui.js
 

 # Removed
- No items removed


# [1.0.8] - 2019-30-07

 # Added
   - no items added

 # Changed
   @sashajsingh
 - added FAQ, user info to mobile menu
 - updated authui.js for the mobile menu to show Username and Log Out

 # Removed
- No items removed

# [1.0.7] - 2019-28-07

 # Added
   @simeon9696
 - adminmetrics.html --displays information about user interaction with the website
 - adminmetricsstyle.css
 - adminmetrics.js

 # Changed
   @simeon9696
 - fixed error in joblist.js with 'apply' not showing up in button unless a user was logged in 
 - added functionality to landing page login, able to create account with the form or use a google log in --index.js
 - added some mobile support to landing page login --index_style.css

 # Removed
- No items removed

# [1.0.6] - 2019-23-07

 # Added
 - No new items added

 # Changed
  @simeon9696
 - fixed error in joblist.js with quotation marks not being placed around id's
 - added the functionality for a user to be able to download files that they have downloaded, userprofileinfo.html and associated css and js files. 

 # Removed
- No items removed

# [1.0.5] - 2019-22-07

 # Added
 - No new items added

 # Changed
  @simeon9696
 - added sanitization capabilities to joblist.js and userprofileinfo.js
 - changed title tag of privacy policy page to 'Privacy Policy | EmployTT'

 # Removed
- No items removed

# [1.0.4] - 2019-22-07

 # Added
 - No new items added
 
 # Changed
  @sashajsingh
- styled All Jobs page, (mobile screens too)
- changed FAQ heading style

 # Removed
- No items removed

# [1.0.3] - 2019-21-07

 # Added

 - No new items added

 # Changed
  @simeon9696
- Added information to privacy policy 
- Added privacy policy styles


 # Removed
- No items removed

# [1.0.2] - 2019-21-07

 # Added
 - No new items added

 # Changed
  @simeon9696
- Added functionality when a user clicks on share, the link is automatically copied to clipboard  - joblist.js
- Modified look of PDF file for job description - joblist.js, jobquery.js
- Added custom fonts for PDF - joblist.html, jobquery.html
- Added lengthy variable in authui.js for use in joblist and jobquery.js
- Added dependncies for PDF make and Email in root folder 'node_modules'
- Added new email cloud function for sending email on job application. - joblist.js

 # Removed
- No items removed

# [1.0.1] - 2019-07-13

 # Added
- Job Query page.(Js, html, css) Similar format to Joblist page 
- @wetcrix -Button which generates sharable link to Joblist 
- @wetcrix -Added all details to job the information displayed @wetcrix

 # Changed
 - Format jobs displayed changed from Table to list, Joblist + JobQuery [@simeon9696, @sashajsingh, @wetcrix](https://github.com/simeon9696, https://github.com/sashajsingh, https://github.com/wetcrix)

 # Removed
 - joblist.css file ,_,
# [1.0.1] - 2019-07-13

 # Added
- Job Query page.(Js, html, css) Similar format to Joblist page 
- @wetcrix -Button which generates sharable link to Joblist 
- @wetcrix -Added all details to job the information displayed @wetcrix

 # Changed
 - Format jobs displayed changed from Table to list, Joblist + JobQuery [@simeon9696, @sashajsingh, @wetcrix](https://github.com/simeon9696, https://github.com/sashajsingh, https://github.com/wetcrix)

 # Removed
 - joblist.css file ,_,
