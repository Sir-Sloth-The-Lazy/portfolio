import React from 'react'
import gsap from 'gsap';
import { Navbar, Welcome, Dock, BackgroundPaths } from '#components'
import { Draggable } from 'gsap/Draggable'
import { Terminal, Safari, Resume, Finder, Text } from '#windows';
gsap.registerPlugin(Draggable);


/**
 * Render the application's main layout containing navigation, welcome, dock, and terminal.
 *
 * @returns {JSX.Element} The root JSX element for the app's main content.
 */
function App() {
  return (
    <main>
      <BackgroundPaths title="Jeevant's Portfolio" />
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
    </main>
  )
}

export default App