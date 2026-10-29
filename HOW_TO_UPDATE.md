# 🛠️ How to Update Your Portfolio

Welcome to your modern, scalable developer portfolio! 

This portfolio is engineered with a **data-driven architecture**: all your content (projects, certificates, skills, bio, links) is separated from the HTML markup and managed inside a single file: `js/data.js`.

---

## ⚡ Two Easy Ways to Update

### Method 1: Using the Visual Update Companion (Recommended!)
We've included an interactive tool named `update-helper.html` right in your portfolio folder:
1. Double-click `update-helper.html` to open it in your browser.
2. Select **"Add New Project"** or **"Add New Certificate"**.
3. Fill in the fields (Title, Description, Tags, Links, etc.).
4. Click **"Generate Code"** and click **"Copy Code"**.
5. Open `js/data.js`, paste your copied snippet into the `projects: [ ... ]` or `certificates: [ ... ]` list, and save!
6. Refresh `index.html`. Your new project or certificate is live!

---

### Method 2: Editing `js/data.js` Directly
Open `js/data.js` in VS Code or Notepad. Here is how each section works:

---

## 🚀 1. Adding a New Project

In `js/data.js`, find the `projects: [` array. Add a new object like this:

```javascript
{
  id: "my-smart-agent",                          // Unique short ID (lowercase, hyphens)
  title: "AI Medical Scanner",                  // Full project name
  category: "ai",                                // Options: "ai", "web", or "tools"
  featured: true,                                // true or false
  tagline: "Real-time diagnostic assistant using vision models.", // 1-sentence summary
  description: "Detailed description of what it does, how it works, and the impact.",
  tags: ["Python", "FastAPI", "YOLO", "Docker"], // List of technologies used
  github: "https://github.com/bhanu-367-sri/repo-name", // GitHub link
  demo: "https://my-demo-link.com",              // Live demo link (or "#" if none)
  icon: "🩺",                                    // Any emoji you like!
  badge: "Featured",                             // Optional badge (e.g. "Hackathon", "v2.0")
  highlights: [                                  // 2 to 4 bullet points for the modal
    "Implemented multimodal processing with < 500ms latency",
    "Containerized deployment using Docker and FastAPI",
    "Comprehensive test suite with 95% code coverage"
  ]
},
```

> **Tip:** Remember to put a comma `,` between project blocks!

---

## 📜 2. Adding a New Certificate or Credential

In `js/data.js`, find the `certificates: [` array. Add a new object:

```javascript
{
  id: "cert-aws-cloud",
  title: "AWS Certified Cloud Practitioner",
  issuer: "Amazon Web Services (AWS)",
  date: "2025",
  category: "data", // Options: "ai", "web", "data", or "achievement"
  credentialUrl: "https://www.linkedin.com/in/bhanu-sri-damisetty-4890553a2", // Verification link
  icon: "☁️",
  skills: ["Cloud Architecture", "EC2", "S3", "IAM"],
  description: "Validated fundamental understanding of cloud infrastructure, security, and AWS core services."
},
```

---

## 💻 3. Updating Skills & Technologies

In `js/data.js`, find the `skills: { categories: [` section.

To add a new skill to any category (e.g., Languages, AI, Web, Tools), add an item to the `skills: [` array:

```javascript
{ name: "Docker", level: "Intermediate", icon: "DK" },
{ name: "PostgreSQL", level: "Proficient", icon: "PG" }
```

---

## 📷 4. Updating Your Profile Photo

1. Take your new photo and save it as **`my-photo.jpg`**.
2. Replace the existing `my-photo.jpg` in your portfolio folder.
3. Refresh `index.html`. If you don't see the update immediately, press `Ctrl + F5` (hard refresh to clear browser image cache).

---

## 📄 5. Adding Your PDF Resume

1. Name your PDF resume **`resume.pdf`**.
2. Place it in the root portfolio folder (right next to `index.html`).
3. Now, whenever a recruiter or visitor clicks **"Resume 📄"**, they can view and download your actual PDF directly!

---

## 🌐 6. How to Host on GitHub Pages (Free, in 2 Minutes!)

Your portfolio is 100% static and requires zero build step or server setup.

1. Open your GitHub account: [github.com/bhanu-367-sri](https://github.com/bhanu-367-sri).
2. Create a new public repository named:
   - **`bhanu-367-sri.github.io`** (Recommended! This will make your portfolio URL `https://bhanu-367-sri.github.io/`)
   - OR any repository name like **`portfolio`**.
3. Push or upload all the files from this folder (`index.html`, `css/`, `js/`, `my-photo.jpg`, etc.) into that repository.
4. On GitHub, go to **Settings** → **Pages** (in the left sidebar).
5. Under **Branch**, select `main` (or `master`) and folder `/ (root)`, then click **Save**.
6. Within 60 seconds, your portfolio will be live worldwide!

---

## ❓ Frequently Asked Questions

**Q: Can I open index.html without internet or a server?**  
Yes! Double-click `index.html` anywhere. It loads instantly and completely offline.

**Q: Will the contact form work without a backend server?**  
Yes! When someone clicks "Send Message", it automatically generates a pre-filled email in their default email app addressed directly to your inbox (`bhanusridamisetty@gmail.com`), ensuring 100% deliverability without exposing server credentials.

**Q: How do I change my email or LinkedIn link?**  
Open `js/data.js` and edit `personal.email` or `personal.socials.linkedin`. It updates everywhere on the site simultaneously!
