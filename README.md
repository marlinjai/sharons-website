# Sharon's Hypnotherapy Website

Welcome! This is the source code for Sharon's Hypnotherapy website. It is built using [Next.js](https://nextjs.org/), a modern website framework. This guide will help you get started, even if you have never used JavaScript or Next.js before.

---

## What is this project?
This website presents information about Sharon's hypnotherapy services, including:
- Services offered
- Reviews
- About Sharon
- Contact information
- Blog
- Booking a session

The site is designed to be easy to update and maintain.

---

## How to run the website on your computer (development mode)

### 1. Prerequisites
- **Node.js** and **npm** must be installed on your computer.
  - Download from: https://nodejs.org/
  - Install the "LTS" version (recommended for beginners).

### 2. Download the project files
- If you received a ZIP file, unzip it to a folder.
- If you are using GitHub, click "Code" > "Download ZIP" or clone the repository.

### 3. Open a terminal (command prompt)
- On Mac: Open the "Terminal" app (search for it in Spotlight).
- On Windows: Open "Command Prompt" or "PowerShell".
- On Linux: Open your terminal app.

### 4. Go to the project folder
- Type `cd ` (with a space), then drag the project folder into the terminal and press Enter.
  - Example: `cd /Users/yourname/Downloads/sharons-website`

### 5. Install the required packages
- Type this command and press Enter:
  ```
  npm install
  ```
- This will download everything the website needs to run. It may take a few minutes.

### 6. Start the website in development mode
- Type this command and press Enter:
  ```
  npm run dev
  ```
- You should see a message like:
  `Local: http://localhost:3000`

### 7. Open the website in your browser
- Open Google Chrome, Safari, or Firefox.
- Type `http://localhost:3000` in the address bar and press Enter.
- You should see Sharon's website!

---

## How to edit the website (for beginners)

### Where are the pages?
- All main pages are in the `app/` folder:
  - `app/page.tsx` — The homepage
  - `app/layout.tsx` — The layout (header/footer)
  - `app/globals.css` — The global styles (colors, fonts, etc.)

### Where are the components?
- Reusable parts of the site (like the header, footer, booking form, etc.) are in the `components/` folder:
  - `components/Header.tsx` — The top navigation bar
  - `components/Footer.tsx` — The bottom of the page
  - `components/Hero.tsx` — The main section on the homepage
  - ...and more (each file is a different section or feature)

### How to make changes
1. Open the project folder in a code editor (for example, [Visual Studio Code](https://code.visualstudio.com/)).
2. Find the file you want to change (see above for where things are).
3. Edit the text or content as needed. For example, change the text in `components/About.tsx` to update the "About" section.
4. Save the file.
5. The website will automatically reload in your browser. Refresh if you don't see changes.

### Tips
- If you make a mistake, you can undo changes in your editor (Ctrl+Z or Cmd+Z).
- You do **not** need to restart the server for most changes.
- If the website crashes, check the terminal for error messages. You can always stop the server with `Ctrl+C` and start again with `npm run dev`.

---

## Need help?
- If you get stuck, search for your error message on Google, or ask for help from someone familiar with web development.
- The [Next.js documentation](https://nextjs.org/docs) is a good resource for learning more.

---

*This README is written for total beginners. If you have any questions, don't hesitate to ask for help!* 