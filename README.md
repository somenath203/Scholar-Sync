# Scholar Sync 🚀📚  

## 🎥 **Application Demo Video**  

![Screenshot](https://github.com/user-attachments/assets/a10cb021-71a4-4ae1-bdeb-bf7c40afde16)  

🔗 [Watch on YouTube](https://www.youtube.com/watch?v=543kulhJG8w)  

---

## ✨ **Introduction**  
Scholar Sync is an innovative web application designed to simplify and enhance the academic experience for students and parents alike. With features like personalized AI-powered study roadmaps, automated question-answer generation, and organized YouTube study resources, Scholar Sync empowers users to plan, organize, and optimize their learning journey. Built using cutting-edge technologies, Scholar Sync ensures seamless interaction and effective resource management, all in one unified platform.  

---

## 🌟 **Features of the Application**  

### 👩‍🎓 **User Features**  

1. **AI-Powered Roadmaps** 🗺️  
   Create tailored study plans based on your syllabus and learning style. Stay on track and achieve your study goals with structured guidance.  

2. **Topic-Based QnA Generator** ❓💡  
   Generate 10 customized questions and answers for any topic with ease. Just input a topic and description, and let Scholar Sync do the rest.  

3. **YouTube Study Guides** 🎥📖  
   Save, organize, and access useful YouTube videos for efficient study sessions. Keep all your educational video resources in one convenient place.  

4. **Pagination** 📄➡️  
   Enjoy a clean, organized interface with paginated sections (3 items per page) for roadmaps, YouTube links, and QnAs, ensuring smooth navigation.  

5. **Content Deletion** ❌🗂️  
   Manage your data effectively by deleting specific roadmaps, QnAs, or YouTube resources when they are no longer needed.  

### 👨‍💻 **Admin Features**  

1. **Admin Dashboard** 📊  
   Access insights like the total count of roadmaps, QnA sets, YouTube resources, and users on the platform.  

2. **User Management** 🛠️👥  
   View detailed user information, including user IDs, names, emails, and their created content. Monitor banned users easily.  

3. **Ban/Unban Users** 🚫✔️  
   Enforce platform rules by banning users with a provided reason or unbanning them as necessary.  

4. **Content Management** ✂️📑  
   Ensure platform quality by deleting any roadmap, QnA, or YouTube resource created by users, as required.  

5. **Pagination** 📄➡️  
   Navigate efficiently through admin content with paginated sections (3 items per page) for roadmaps, YouTube links, and QnAs.  

---

## 🌐 **Deployment Link**  

**Live Preview:** 🔗 [Scholar Sync](https://scholarsync-som.vercel.app/)  

---

## 🛠️ **Technologies Used**  

- **Next.js** 🚀: Framework for fast, server-rendered web applications.  
- **ShadCN UI** 🎨: Responsive UI component library for elegant interfaces.  
- **Tailwind CSS** 💨: Utility-first CSS framework for styling with ease.  
- **React Hook Form** 📝: Efficient library for form handling and validation.  
- **Zod** ✅: Ensures robust data validation across the app.  
- **React Hot Toast** 🔔: Delivers user-friendly and customizable notifications.  
- **Prisma** 🛠️: ORM for seamless database interaction with Neon PostgreSQL.  
- **Neon PostgreSQL** 💾: Reliable, cloud-hosted database for secure data storage.  
- **Kinde Authentication** 🔐: Provides secure login and user authentication.  
- **GROQ API** ⚡: Enables fast, efficient data querying and management.  
- **Google GEMMA2-9B-IT Model** 🤖: AI model powering study planning and QnA generation.  
- **LangChain** 🧠: Streamlines AI integrations for building smarter, context-aware features.  
- **Recharts** 📊: Used in the admin panel to display total numbers of YouTube guides, roadmaps, and QnAs in graphical format.  

---

## 📝 **Note**  

If while generating a roadmap or the top 10 QnAs, you encounter an error like:  

> An error occurred while fetching the roadmap or the LLM model was unable to generate the Roadmap correctly. Please go back, refresh the page, and try creating a new one.

OR

> An error occurred while fetching the QnA or the LLM model was unable to generate the Roadmap correctly. Please go back, refresh the page, and try creating a new one.  

One common reason for this issue is that the response generated by the LLM model cannot be converted into JSON format to display it. In such case:  

1. Go back to the previous page.  
2. Refresh the page.  
3. Try creating a new roadmap or QnA again.

---

## ⚠️ **Disclaimer**  
The creator of this application is not responsible for any incorrect content generated by the GROQ API, LangChain, or Google’s GEMMA2-9B-IT model, as these operate beyond the creator's control.  
