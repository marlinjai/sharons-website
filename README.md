# Sharon's Hypnotherapy Website

Welcome! This is the source code for Sharon's Hypnotherapy website.  
You are now viewing the project in Cursor, your code editor.

This guide will help you run, view, and edit the website—even if you have never used JavaScript or Next.js before.

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

## How to run the website (development mode)

### 1. Open a terminal in Cursor

- In Cursor, open the built-in terminal.  
  (Look for a "Terminal" or "New Terminal" option, usually at the bottom or in the menu.)

### 2. Start the website

- In the terminal, type this command and press Enter:
  ```
  npm run dev
  ```
- You should see a message like:
  ```
  Local: http://localhost:3000
  ```

### 3. View the website

- Open your web browser (Google Chrome, Safari, or Firefox).
- Type `http://localhost:3000` in the address bar and press Enter.
- You should see Sharon's website!

---

## How to edit the website

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

1. In Cursor, click on the file you want to change (see above for where things are).
2. Edit the text or content as needed. For example, change the text in `components/About.tsx` to update the "About" section.
3. Save the file (press `Ctrl+S` or `Cmd+S`).
4. The website will automatically reload in your browser. Refresh if you don't see changes.

### Tips

- If you make a mistake, you can undo changes in Cursor (Ctrl+Z or Cmd+Z).
- You do **not** need to restart the server for most changes.
- If the website crashes, check the terminal for error messages. You can always stop the server with `Ctrl+C` and start again with `npm run dev`.

---

## Need help?

- If you get stuck, search for your error message on Google, or ask for help from someone familiar with web development.
- The [Next.js documentation](https://nextjs.org/docs) is a good resource for learning more.

---

_This README is written for total beginners. If you have any questions, don't hesitate to ask for help!_
