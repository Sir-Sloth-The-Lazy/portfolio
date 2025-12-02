import React from 'react'
import gsap from 'gsap';
import { Navbar, Welcome, Dock } from '#components'
import { Draggable } from 'gsap/Draggable'
import { Terminal, Safari, Resume } from '#windows';
gsap.registerPlugin(Draggable);


/**
 * Render the application's main layout containing navigation, welcome, dock, and terminal.
 *
 * @returns {JSX.Element} The root JSX element for the app's main content.
 */
function App() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
    </main>
  )
}

export default App