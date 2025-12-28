# CV-Synth

**CV-Synth** is a modern, privacy-first resume builder designed to create premium, professional CVs with ease. Built with Next.js and Tailwind CSS, it offers a real-time "What You See Is What You Get" (WYSIWYG) editing experience without ever sending your personal data to a server.

<img width="1914" height="892" alt="image" src="https://github.com/user-attachments/assets/bb79e38f-31d5-456a-bdd6-17e2f489492f" />


## ✨ Key Features

- **Real-Time Preview**: See your changes instantly as you type.
- **Privacy First**: All data lives locally in your browser. No databases, no tracking.
- **Native File Saving**: Save your progress as a `.json` file directly to your disk and overwrite it properly (supported on Chrome/Edge).
- **PDF Export**: Generate high-quality, print-ready PDFs.
- **Rich Customization**:
  - **Granular Typography**: Customize fonts for Names, Headers, and Body text independently.
  - **Layout Controls**: Adjust page margins, line heights, and section ordering via drag-and-drop.
  - **Theme**: Clean, professional aesthetics with visual separators and alignment tools.
- **Smart Inputs**: specialized date pickers (MM/YYYY) and degree selectors.
- **Advanced Content**:
  - **Awards Section**: dedicated space for achievements.
  - **Custom Links**: Add ResearchGate, Behance, or any other profile.
  - **Subtitles**: Free-text subheaders for your personal profile.
- **Section Management**:
  - **Visibility Toggles**: Hide/Show entire sections with one click.
  - **Drag-and-Drop**: Easily reorder main sections to suit your narrative.

---

## 🚀 User Guide

### How to Run this App (Local Version)

If you are not a developer, don't worry! You just need to install one tool to get this running on your computer.

#### 1. Install Node.js
This app needs **Node.js** to run.
- Go to [nodejs.org](https://nodejs.org/).
- Download and install the **LTS (Long Term Support)** version for your operating system (Windows, Mac, or Linux).
- Follow the installer prompts (clicking "Next" until finished).

#### 2. Download & Setup
1. Download this project code (if you haven't already).
2. Open your **Terminal** (Mac/Linux) or **Command Prompt / PowerShell** (Windows).
3. Navigate to the project folder.
   > *Tip: You can type `cd`, press space, and then drag the folder into the terminal window to get the path.*
4. Type the following command and press **Enter**:
   ```bash
   npm install
   ```
   *(This downloads all the necessary building blocks. It might take a minute.)*

#### 3. Start the App
Once installed, type this command and press **Enter**:
```bash
npm run dev
```
You should see text saying `Ready in ...`.

#### 4. Open in Browser
Open your web browser (Chrome is recommended) and go to:
[http://localhost:3000](http://localhost:3000)

### 🔒 Private & Offline
Once you start the app, it runs **entirely on your own computer**.
- **Works Offline**: You don't need an internet connection to create or edit your resume.
- **100% Private**: Your personal data **never** leaves your system. There are no servers, no clouds, and no tracking. You have complete ownership of your files.

---

### How to Use

1. **Edit Content**: Use the **Content** tab on the left to fill in your details.
   - **Personal**: Name, Title, Contact Info.
   - **Sections**: Add Experience, Education, Skills, etc.
   - **Reorder**: Drag section headers (≡) to change their order.
   - **Visibility**: Click the Eye icon to hide sections you don't need right now.
2. **Design**: Switch to the **Design** tab to tweak fonts, sizes, and margins.
3. **Save Your Work**: Click the **Floppy Disk** icon ("Save") to save your progress to your computer.
   - *Note*: Use the **Folder** icon ("Load") to open these files later.
4. **Export**: Click **Download PDF** to get your final resume.

---

## 💻 For Developers

CV-Synth is a Next.js 14+ application using the App Router.

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/cv-synth.git
   cd cv-synth
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

### Architecture

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **PDF Generation**: `react-to-print` with custom CSS print media queries.
- **State Management**: React `useState` (Local state is sufficient for this scope).

### Project Structure

```
cv-synth/
├── app/
│   ├── layout.js      # Main layout & Metadata
│   ├── page.js        # Core application logic (Editor + Preview split)
│   └── globals.css    # Global styles & Tailwind directives
├── components/
│   ├── editor/        # ContentEditor, DesignEditor, SectionList
│   ├── preview/       # ResumePreview (The visual output)
│   └── ui/            # Reusable UI (Buttons, Inputs, DatePickers)
├── lib/
│   ├── constants.js   # Initial data, font lists, page sizes
│   └── utils.js       # Helper functions
└── public/            # Static assets
```

### Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---

## 💻 Created with ❤️ by:

**Salman Tabatabai**

[GitHub](https://github.com/Salman-Tabatabai-AI/)

[LinkedIn](https://www.linkedin.com/in/salman-tabatabai)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/N4N61R5TEX)

---

## 📃 License
This project is open-source and available under the [MIT License](LICENSE).
