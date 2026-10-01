import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Ai() {
    const [showSearch, setShowSearch] = useState(false)
    const navigate = useNavigate()
    const recognitionRef = useRef(null)
    const [listening, setListening] = useState(false)
    const audioRef = useRef(new Audio('https://www.myinstants.com/media/sounds/pop-2.mp3'));

    const speak = (message) => {
        const utterance = new SpeechSynthesisUtterance(message)
        window.speechSynthesis.speak(utterance)
    }

    const handleClick = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0; 
            audioRef.current.play();
        }
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        

        if (!SpeechRecognition) return alert("Speech Recognition not supported in this browser.")

        
        if (!recognitionRef.current) {
            const recognition = new SpeechRecognition()
            recognition.continuous = false
            recognition.lang = 'en-US'

            recognition.onstart = () => setListening(true)
            recognition.onend = () => setListening(false)
            recognition.onerror = (err) => console.error("Speech Recognition Error:", err)

            recognition.onresult = (e) => {
                const transcript = e.results[0][0].transcript
                console.log("Speech Result:", transcript)
                const text = transcript.toLowerCase()

                if (text.includes("search") && text.includes("open") && !showSearch) {
                    speak("Opening Search")
                    setShowSearch(true)
                    navigate("/collection")
                } else if (text.includes("search") && text.includes("close") && showSearch) {
                    speak("Closing Search")
                    setShowSearch(false)
                } else if (text.includes("collection") || text.includes("collections") || text.includes("product") || text.includes("products")) {
                    speak("Opening Collection page")
                    navigate("/collection")
                } else if (text.includes("about") || text.includes("aboutpage")) {
                    speak("Opening About page")
                    navigate("/about")
                    setShowSearch(false)
                } else if (text.includes("home") || text.includes("homepage")) {
                    speak("Opening home page")
                    navigate("/")
                    setShowSearch(false)
                } else if (text.includes("cart") || text.includes("kaat") || text.includes("caat")) {
                    speak("Opening your cart")
                    navigate("/cart")
                    setShowSearch(false)
                } else if (text.includes("contact")) {
                    speak("Opening Contact page")
                    navigate("/contact")
                    setShowSearch(false)
                } else if (text.includes("order") || text.includes("myorders") || text.includes("orders") || text.includes("my order")) {
                    speak("Opening your orders page")
                    navigate("/order")
                    setShowSearch(false)
                } else {
                    toast.error("Try Again")
                }
            }

            recognitionRef.current = recognition
        }

        
        if (!listening) {
            recognitionRef.current.start()
        } else {
            recognitionRef.current.stop()
        }
    }

    return (
        <div className='fixed bottom-[88px] left-3 lg:bottom-5 lg:left-5 z-30' onClick={handleClick}>
            <img
                src="https://res.cloudinary.com/dymntfrwl/image/upload/v1755844557/chatbot-chat-message-vectorart_guoglc.png"
                alt="Chatbot"
                className='w-14 sm:w-16 lg:w-20 cursor-pointer animate-pulse transition-transform hover:scale-110 drop-shadow-[0_0_12px_rgba(79,70,229,0.7)]'
            />
        </div>
    )
}

export default Ai
