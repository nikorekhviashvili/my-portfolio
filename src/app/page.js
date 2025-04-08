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
    title: "mm food",
    description: "Tiny, cute app for analysing restaurant menus for dietary restrictions using AI.",
    link: "https://mmfood.app",
    src: "mmfood.png",
    color: "#F1E9D6"
  },
  {
    title: "GTFS.fyi",
    description: "Free tool to visualize GTFS data fully in browser - both static and real-time.",
    link: "https://www.gtfs.fyi/",
    src: "gtfs-fyi.png",
    color: "#15D602"
  },
  {
    title: "Tunetales",
    description: "Check your Spotify listening history and get beautiful visualizations of your music taste.",
    link: "https://tunetales.xyz",
    src: "tunetales.png",
    color: "#DA5B3F"
  }
];

// Music projects
const musicProjects = [
  {
    title: "Easter",
    description: "First 3 tracks released on Soundcloud. All recorded in summer 2024.",
    link: "https://soundcloud.com/niko-rekhviashvili-532643644/sets/self-titled?si=ceae68cdb1b94203add12d5829662b06&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    src: "Easter.png",
    color: "#FFD200" 
  }
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
          <p className={styles.sectionSubtitle}>Side projects and experiments I have been building in my free time with codegen AI tools.</p>
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
          <p className={styles.sectionSubtitle}>Some of my music that I have been not embarrassed to share publicly. More coming soon!</p>
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

        {/* <section className={styles.section}>
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
        </section> */}
        <footer className={styles.footer}>
          <p>Get in touch: <a href="mailto:niko.rekhviashvili@gmail.com">niko.rekhviashvili@gmail.com</a></p>
        </footer>
      </div>
      <Modal modal={modal} projects={modal.projects || []}/>
    </main>
  )
}
