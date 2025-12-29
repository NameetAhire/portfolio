import { Project, Experience, Education, Certification, SkillCategory } from './types';

export const PERSONAL_INFO = {
  name: "Nameet Ahire",
  title: "Computer Engineer & ML Enthusiast",
  email: "nameet.7800@gmail.com",
  phone: "+91 9689217478",
  location: "Ashirwad Palace, Om Sai Nagar, Ulhasnagar-1",
  linkedin: "https://www.linkedin.com/in/nameet-ahire-673b27314",
  github: "https://github.com/NameetAhire",
  about: "I am a Computer Engineering student currently pursuing MTech, with hands-on project experience in web development, cloud-based systems, and machine learning. I have a strong foundation in Python, SQL, and AWS/GCP.",
  avatar: "https://res.cloudinary.com/dg27pcq2r/image/upload/v1767026949/myself_sufpba.jpg" 
};

export const EXPERIENCE: Experience[] = [
  {
    id: "exp-1",
    role: "IT Intern / Support",
    company: "Century Rayon",
    period: "June 2024 - July 2024",
    description: "Provided technical support for hardware, software, and network-related issues while diagnosing and resolving IT problems to ensure smooth system operations. Assisted with system maintenance, troubleshooting, and user support, and collaborated with team members to support daily IT operations."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Intelligent Road Incident Detection System",
    period: "June 2023 - April 2024",
    description: [
      "Developed an intelligent road incident detection system utilizing YOLO, Streamlit, and Python computer vision libraries.",
      "Trained multiple detection models including car accident, fire, fall, and weapon detection."
    ],
    technologies: ["Python", "YOLO", "Streamlit", "OpenCV", "Machine Learning"],
    // Updated image: Man sitting in front of multiple monitors (Headway)
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "proj-2",
    title: "Secure E-Prescription System Using Cloud",
    period: "August 2022 - March 2023",
    description: [
      "Built a secure cloud-based e-prescription web application deployed on AWS EC2.",
      "Integrated a chatbot using FlowXO for user interaction.",
      "Published a research paper titled 'E-Prescription in Healthcare System Using Cloud'."
    ],
    technologies: ["AWS EC2", "FlowXO", "Web Development", "Cloud Security"],
    // Existing image preserved
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "proj-3",
    title: "Railway Reservation System",
    period: "June 2021 - April 2022",
    description: [
      "Developed a web-based railway reservation system.",
      "Implemented an online payment gateway for seamless transactions."
    ],
    technologies: ["HTML", "CSS", "JavaScript", "MySQL"],
    // Existing image preserved
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "proj-4",
    title: "SecureCheck",
    period: "2024",
    description: [
      "Designed and implemented a machine learning-based phishing URL detection system.",
      "Analyzes URL features in real-time to identify and block potential security threats using advanced classification algorithms."
    ],
    technologies: ["Python", "Machine Learning", "Scikit-learn", "Cybersecurity"],
    link: "https://github.com/NameetAhire/SecureCheck",
    // Existing image preserved
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop"
  }
];

export const EDUCATION: Education[] = [
  {
    id: "edu-1",
    institution: "Sardar Patel Institute Of Technology",
    degree: "MTech in Computer Engineering (First Year)",
    period: "Pursuing"
  },
  {
    id: "edu-2",
    institution: "MCT Rajiv Gandhi Institute Of Technology",
    degree: "B.E In Computer Engineering",
    period: "Jan 2021 - July 2024",
    grade: "8.82 CGPA"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-1",
    name: "Google Cloud Career Readiness Associate - Data Analyst Track",
    issuer: "Google Cloud",
    period: "March 2024 - April 2024",
    link: "https://tan-kira-56.tiiny.site/" 
  },
  {
    id: "cert-2",
    name: "Google Cloud Career Readiness Associate - Cloud Engineer Track",
    issuer: "Google Cloud",
    period: "August 2023 - September 2023",
    link: "https://green-devora-35.tiiny.site/" 
  }
];

export const SKILLS: SkillCategory[] = [
  {
    name: "Programming & Web",
    skills: ["Python", "JavaScript", "HTML", "CSS", "MySQL"]
  },
  {
    name: "Machine Learning",
    skills: ["YOLO", "OpenCV", "Computer Vision", "Streamlit", "Data Analysis"]
  },
  {
    name: "Cloud & DevOps",
    skills: ["AWS EC2", "Google Cloud Platform", "Hardware/Software Troubleshooting", "Network Support"]
  },
  {
    name: "Tools",
    skills: ["FlowXO", "Git", "VS Code", "MS Office"]
  }
];