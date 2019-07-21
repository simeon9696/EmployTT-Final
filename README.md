

# EmployTT- Government Recruitment Application [![Netlify Status](https://api.netlify.com/api/v1/badges/3d71f4dd-2d36-46d3-b419-e8df37426162/deploy-status)](https://app.netlify.com/sites/employtt/deploys)

GoRTT is seeking to implement an online recruitment system which will aid citizens to conveniently access job vacancies within MDAs, making applying for these positions simple, quick and trackable while lessening the cost of marketing these positions to the general public. This solution will improve citizen satisfaction and quicken the rate at which MDAs can complete the hiring process. EmployTT is expected to be developed in multiple phases with Phase 1 being implemented via this Hackathon.


# Getting Started
  1. For local testing a live server is necessary. To install a live server on your machine using VS Code, go to 
     Extensions, search "Live Server" and install the extension.
  2. Clone or download the repository 
  3. Install all the pre-requistes listed below. 
  4. Right click on "index. html" in VS Code and select "Launch with Live Server".

# Prerequisites
  - Firebase CLI
  - Firebase Functions
  - Firebase Admin SDK
  - Nodemailer
  
This assumes that you have access to the firebase project for this repository already. If you do not, please contact one of the authors for authentication. 

To install the Firebase CLI,firebase-functions and firebase-admin follow these steps. 
- Make sure that your terminal is pointing to the root of your project. 
- If you've already cloned the repository, the firebase commands will ask to overwrite file. Select yes for every file except **index.js** so that you will preserve the functions from the repository.

```
npm install firebase-functions@latest firebase-admin@latest --save
npm install -g firebase-tools
```
Then, initialize Firebase SDK for Cloud Functions:
```
firebase login
firebase init functions
```
If you do make edits to the cloud functions use this commmand to deploy the changes: 
```
firebase deploy --only functions
```
Next to install Nodemailer
```
npm install nodemailer
```
And then jsPDF
```
npm install jspdf --save
```
# Built With
  - Firebase
  - PDF.js
  - Nodemailer

# Authors
- Sasha Singh - @sashajsingh
- Darrin Jogie - @wetcrix
- Ria Rambaran - @riarenuka
- Simeon Ramjit - @simeon9696


# Acknowledgments
- Gillan Morris, Mentor - @geverett
- Darrien Persad, Mentor - @darrific

