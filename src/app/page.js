'use client';
import styles from './page.module.css'
import { useState } from 'react';
import Project from '../components/project';
import Modal from '../components/modal';

// Work projects
const workProjects = [
  {
    title: "Ride Pingo",
    description: "Rider app built for cities to launch their own ride pooling services.",
    link: "https://ridepingo.com/",
    src: "RidePingo1.jpeg",
    color: "#000000"
  },
  {
    title: "Drive Pingo",
    description: "Driver app designed for on-demand public transportation.",
    link: "https://theroutingcompany.com/drive-pingo",
    src: "DrivePingo.png", 
    color: "#15D602"
  },
  {
    title: "Pingo Flex",
    description: "Visual building tool to enable building fixed transit routes.",
    link: "https://theroutingcompany.com/newsroom/pingoflexupdate",
    src: "output.webp",
    color: "#EFE8D3"
  },
  {
    title: "Pingo Journey",
    description: "Comprehensive journey planner combining Transit and On-demand options.",
    link: "https://theroutingcompany.com/pingo-journey",
    src: "Pingo Journey.gif",
    color: "#232423"
  },
  {
    title: "Ride Bounce",
    description: "Cheap and convenient ride pooling. Built specifically for students..",
    link: "https://apps.apple.com/us/app/ride-bounce/id6740990514",
    src: "Ride Bounce.png",
    color: "#15D602"
  }
];
// Personal projects
const personalProjects = [
  {
    title: "Side Project",
    description: "A fun weekend project exploring new tech",
    link: "https://example.com/sideproject",
    src: "locomotive.png",
    color: "#EFE8D3"
  },
  {
    title: "Open Source",
    description: "Contributions to the dev community",
    link: "https://example.com/opensource",
    src: "silencio.png",
    color: "#706D63"
  },
];

// Music projects
const musicProjects = [
  {
    title: "My Album",
    description: "First album release on Spotify",
    link: "https://spotify.com",
    src: "c2montreal.png",
    color: "#1DB954" // Spotify green
  },
  {
    title: "Music Video",
    description: "Official music video on YouTube",
    link: "https://youtube.com",
    src: "officestudio.png",
    color: "#FF0000" // YouTube red
  },
];

// Blog articles
const blogArticles = [
  {
    title: "Tech Article",
    description: "My thoughts on the latest tech trends",
    link: "https://medium.com",
    src: "locomotive.png",
    color: "#12100E" // Medium dark
  },
  {
    title: "Design Process",
    description: "How I approach design challenges",
    link: "https://dev.to",
    src: "silencio.png",
    color: "#0A0A0A" // Dev.to black
  },
];

export default function Home() {
  const [modal, setModal] = useState({active: false, index: 0, category: '', projects: []});

  const handleProjectHover = (active, index, category, projects) => {
    setModal({active, index, category, projects});
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Niko Rekhviashvili</h1>
          <p className={styles.sectionSubtitle}>Amsterdam based Product Manager. In the evenings, I enjoy building tiny apps or creating music.</p>
        </header>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Work</h2>
          <p className={styles.sectionSubtitle}>These are some of the highlighted projects I&apos;ve worked on in my career. Mostly from my current role at The Routing Company as a head of product. </p>
          <div className={styles.projectList}>
            {workProjects.map((project, index) => (
              <Project 
                key={`work-${index}`}
                index={index} 
                title={project.title} 
                description={project.description}
                link={project.link}
                onHover={(active) => handleProjectHover(active, index, 'work', workProjects)}
                headingLevel="h3"
              />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Personal Projects</h2>
          <p className={styles.sectionSubtitle}>Side projects and experiments</p>
          <div className={styles.projectList}>
            {personalProjects.map((project, index) => (
              <Project 
                key={`personal-${index}`}
                index={index} 
                title={project.title} 
                description={project.description}
                link={project.link}
                onHover={(active) => handleProjectHover(active, index, 'personal', personalProjects)}
                headingLevel="h3"
              />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Music</h2>
          <p className={styles.sectionSubtitle}>My musical creations</p>
          <div className={styles.projectList}>
            {musicProjects.map((project, index) => (
              <Project 
                key={`music-${index}`}
                index={index} 
                title={project.title} 
                description={project.description}
                link={project.link}
                onHover={(active) => handleProjectHover(active, index, 'music', musicProjects)}
                headingLevel="h3"
              />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Blog</h2>
          <p className={styles.sectionSubtitle}>Articles and thoughts</p>
          <div className={styles.projectList}>
            {blogArticles.map((project, index) => (
              <Project 
                key={`blog-${index}`}
                index={index} 
                title={project.title} 
                description={project.description}
                link={project.link}
                onHover={(active) => handleProjectHover(active, index, 'blog', blogArticles)}
                headingLevel="h3"
              />
            ))}
          </div>
        </section>
      </div>
      <Modal modal={modal} projects={modal.projects || []}/>
    </main>
  )
}
