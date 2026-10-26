import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import { Cursor, FilmGrain } from './components/Effects';
import { FilmRail, Header, ScrollProgress } from './components/Chrome';
import Hero from './components/Hero';
import Origin from './components/Origin';
import Craft from './components/Craft';
import Reel from './components/Reel';
import Freelance from './components/Freelance';
import Record from './components/Record';
import Invitation from './components/Invitation';
import Credits from './components/Credits';
import ProjectModal from './components/ProjectModal';
import { projects } from './data/site';
import { useBodyLock, useLenis } from './hooks';

const INTRO_KEY = 'ak-intro-v2';

export default function App() {
  const [introDone, setIntroDone] = useState(() => sessionStorage.getItem(INTRO_KEY) === 'done');
  const [activeProject, setActiveProject] = useState(null);

  useLenis(introDone);
  useBodyLock(!introDone);

  useEffect(() => {
    if (introDone) sessionStorage.setItem(INTRO_KEY, 'done');
  }, [introDone]);

  const openProject = useCallback((project) => setActiveProject(project), []);
  const closeProject = useCallback(() => setActiveProject(null), []);

  const nextProject = useCallback(() => {
    setActiveProject((current) => {
      if (!current) return current;
      const index = projects.findIndex((p) => p.id === current.id);
      return projects[(index + 1) % projects.length];
    });
  }, []);

  return (
    <>
      <a className="skip-link" href="#origin">Skip to the story</a>

      {!introDone && <Preloader onDone={() => setIntroDone(true)} />}

      <FilmGrain />
      <Cursor />
      <ScrollProgress />
      <Header introDone={introDone} />
      <FilmRail />

      <main>
        <Hero introDone={introDone} />
        <Origin />
        <Craft />
        <Reel onOpen={openProject} />
        <Freelance onOpen={openProject} />
        <Record />
        <Invitation />
        <Credits />
      </main>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            key={activeProject.id}
            project={activeProject}
            onClose={closeProject}
            onNext={nextProject}
          />
        )}
      </AnimatePresence>
    </>
  );
}
