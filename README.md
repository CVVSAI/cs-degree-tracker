# 🎓 Emory CS Degree Tracker

This project is a full-stack web application for **Emory University's Computer Science Department**. It helps graduate students track their degree progress, including coursework, practicum, project/thesis requirements, GPA, and credit totals. It also integrates with Emory's **OPUS RESTful API** to show live **Course Offerings** each semester.

---

## 🚀 Features

- 📜 **Degree Tracker** for coursework, project, and thesis tracks
- ✅ Real-time validation of core, electives, and practicum requirements
- 🎯 Dynamic GPA and credit calculation with visual progress bar
- 📚 **Course Offerings** page pulling data from Emory’s official OPUS REST API
- 📉 Reduced course load alerts and reminders
- 🧠 Modular architecture using React components and Flask backend

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Vite
- **Backend:** Flask, xmltodict, requests
- **Data Source:** Emory OPUS REST API (authenticated XML query)

---

## 📦 Installation (Frontend)

```bash
# Clone the repo
git clone https://github.com/your-username/emory-cs-degree-tracker.git
cd emory-cs-degree-tracker

# Install packages
npm install

# Start dev server
npm run dev
```

The frontend runs at: `http://localhost:3000`

---

## 🐍 Running the Flask Backend

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install packages
pip install flask requests xmltodict flask-cors

# Run backend
python app.py
```

Backend runs at: `http://localhost:5000/api/courses`

---

## 🌐 Course Offerings Integration

The backend fetches authenticated XML data from Emory's OPUS service:

- REST URL: `https://saprod.emory.edu/PSIGW/RESTListeningConnector/PSFT_SAPROD/...`
- Parses XML into JSON using `xmltodict`
- Frontend fetches course list and renders schedule, capacity, instructors, etc.

---

## 🧭 App Structure

```
📁 src
├── components/
│   ├── DegreeTracker/
│   │   ├── CoreCourses.tsx
│   │   ├── ElectivesSection.tsx
│   │   ├── PracticumSection.tsx
│   │   ├── ProjectRequirement.tsx
│   │   ├── ThesisRequirement.tsx
│   │   ├── TrackSelector.tsx
│   │   ├── SemesterSelector.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── GpaTrackerModal.tsx
│   │   └── RequirementChecklist.tsx
│   └── Navbar.tsx
├── pages/
│   ├── Home.tsx
│   ├── Courses.tsx
│   ├── CourseOfferings.tsx
│   ├── Settings.tsx
│   └── Contact.tsx
```

---

## 🔭 Future Work

- 📅 Term/semester dropdown for filtering course offerings
- 🗂️ Upload transcript or credit summary
- 📬 Email reminders for graduation and reduced course load deadlines
- 📊 Charts to visualize progress over semesters

---

