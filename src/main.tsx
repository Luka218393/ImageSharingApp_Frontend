import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { GalleryPage } from './GalleryPage';
import { Navbar } from './components/Navbar'
import { UsernameDialog } from './dialoges/UsernameDialog';
import { Gallery } from './../models/gallery'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from './PageNotFound';



/*
   A conponent that gives order to UI and holds app level state
*/
const Scaffold: React.FC = () => {

  let [username, setUsername] = useState("Anon")
  let [gallery, setGallery] = useState<Gallery>(new Gallery())
  let [usernameDialogVisibility, setUsernameDialogVisibility] = useState(false)



  function toggleUsernameDialogVisibility() { setUsernameDialogVisibility(!usernameDialogVisibility) }

  useEffect(() => {

    //console.log(localStorage.getItem("last_accessed"))

    //Needs fixig: the image needs to have new badge one hour after first seeing the image
    if (localStorage.getItem("username") == null || localStorage.getItem("last_accessed") == null) {
      localStorage.setItem("username", "Anon")
      localStorage.setItem("last_accessed", (Date.now()).toString())
    }


    window.addEventListener("pagehide", (event) => {
      localStorage.setItem("last_accessed", (Date.now()).toString())
      event.preventDefault();
    })

    const username = localStorage.getItem("username")
    if (username != "Anon") { setUsername(username!) }
    else { toggleUsernameDialogVisibility() }

  }, [])

  return (
    <>
      <Navbar />
      {usernameDialogVisibility &&
        (<UsernameDialog setUsername={setUsername} close={toggleUsernameDialogVisibility} gallery={gallery} />)
      }
      <BrowserRouter>
        <Routes>
          <Route path="/gallery/:galleryId" element={<GalleryPage username={username} setGallery={setGallery} />} />
          <Route path="/notFound" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Scaffold />
  </StrictMode>,
)