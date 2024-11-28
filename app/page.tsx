'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Moon, Sun, ArrowUp, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import { useTheme } from "next-themes" 
import Image, { StaticImageData } from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import profile from "../app/images/profile.img-removebg-preview.png"
import { MdWhatsapp } from 'react-icons/md'
import codify from "../app/images/Screenshot 2024-11-28 225632.png"
import portfolio from "../app/images/Screenshot 2024-11-28 230533.png"
import ecommerce from "../app/images/ecommerce.jpeg"
const Logo = () => (
  <motion.div
    className="flex items-center space-x-2"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-10 h-10 bg-sky-500 dark:bg-sky-400 rounded-full flex items-center justify-center">
      <span className="text-white font-bold text-xl">C</span>
    </div>
    <span className="text-2xl font-semibold text-sky-500 dark:text-sky-400 max-sm:hidden">Code With Caleb</span>
  </motion.div>
)

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300])

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-sky-100 to-white dark:from-sky-900 dark:to-black"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200&text=⚡')] bg-repeat opacity-5"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100&text=💻')] bg-repeat opacity-5"
        style={{ y: y3 }}
      />
    </div>
  )
}

const ProjectCard = ({ title, description, image, link }: { title: string; description: string; image: StaticImageData; link: string }) => (
  <Card className="overflow-hidden project-card group">
    <div className="relative overflow-hidden">
      <Image src={image} alt={title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button variant="secondary" size="sm" asChild>
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center">
            View Project <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
    <CardContent className="p-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </CardContent>
  </Card>
)

const SkillsShowcase = () => {
  const skills = [
    'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB'
  ]

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-semibold mb-6 text-center">Skills</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <motion.div
            key={skill}
            className="bg-sky-100 dark:bg-sky-800 rounded-lg p-4 text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg font-medium text-sky-700 dark:text-sky-300">{skill}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function Component() {
  const [activeSection, setActiveSection] = useState('home')
  const { setTheme } = useTheme()
  const sectionsRef = useRef<{ [key: string]: React.RefObject<HTMLElement> }>({
    home: useRef(null),
    about: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  })

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    Object.values(sectionsRef.current).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 overflow-x-hidden">
      <ParallaxBackground />
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-white/80 dark:bg-black/80 backdrop-blur-md">
        <Logo />
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {['home', 'about', 'projects', 'contact'].map((section) => (
            <Button
              key={section}
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection(section)}
              className={activeSection === section ? 'text-sky-500' : ''}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Button>
          ))}
        </div>
      </nav>

      <main className="pt-16">
        <motion.section
          id="home"
          ref={sectionsRef.current.home}
          className="min-h-screen flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div
              className="flex-1 space-y-6"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Ashele Caleb Olusegun
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
                Frontend Developer, UI/UX Designer & Fullstack Enthusiast.
              </p>
              <Button 
                onClick={() => scrollToSection('projects')} 
                size="lg"
                className="bg-sky-500 hover:bg-sky-600 dark:bg-sky-400 dark:hover:bg-sky-300 text-white"
              >
                View My Work
              </Button>
            </motion.div>

            <motion.div
              className="flex-1 flex justify-center items-center"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                <div className="absolute inset-0 bg-sky-200 dark:bg-sky-800 rounded-full filter blur-xl animate-pulse"></div>
                <Image
                  src={profile}
                  alt="Ashele Caleb Olusegun"
                  width={400}
                  height={400}
                  className="relative z-10 w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="about"
          ref={sectionsRef.current.about}
          className="min-h-screen flex items-center justify-center py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-8">About Me</h2>
            <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">
              I'm a passionate frontend developer with a keen eye for design and a love for creating intuitive, responsive web applications. With 1 year of experience in the field, I specialize in React, Next.js, and modern CSS frameworks.
            </p>
            <SkillsShowcase />
          </div>
        </motion.section>

        <motion.section
          id="projects"
          ref={sectionsRef.current.projects}
          className="min-h-screen py-16 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ProjectCard
              title="E-commerce Platform"
              description="A full-featured online store built with Godaddy , a no-code e-commerce website builder."
              image={ecommerce}
              link="https://ladrac.com"
            />
            <ProjectCard
              title="An online coding Platform"
              description="An online coding platform for Html,Css,Javascript,Typescript,Tailwindcss."
              image={codify}
              link="https://just-codify.web.app"
            />
            <ProjectCard
              title="Portfolio Website"
              description="A stunning portfolio site (like this one) showcasing modern web technologies."
              image={portfolio}
              link="https://personal-site-k3ps.vercel.app/"
            />
          </div>
        </motion.section>

        <motion.section
          id="contact"
          ref={sectionsRef.current.contact}
          className="min-h-screen flex items-center justify-center py-16 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">
              Feel free to reach out for collaborations or just a friendly chat about web development!
            </p>
            <div className="flex justify-center space-x-4 mb-8">
              <motion.a
                href="https://github.com/ashele1234"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-gray-100 hover:text-sky-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-8 h-8" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/ashele-caleb-bb656933a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-gray-100 hover:text-sky-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-8 h-8" />
              </motion.a>
              <motion.a
                href="https://wa.link/58dh5m"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-gray-100 hover:text-sky-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MdWhatsapp className="w-8 h-8" />
              </motion.a>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => window.location.href = 'mailto:calebashele@gmail.com.com'}
                size="lg"
                className="bg-sky-500 text-white hover:bg-sky-600 dark:bg-sky-400 dark:text-black dark:hover:bg-sky-300"
              >
                <Mail className="mr-2 h-4 w-4" /> Email Me
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <footer className="py-8 px-4 text-center bg-white/80 dark:bg-black/80 backdrop-blur-md">
        <p className="text-gray-600 dark:text-gray-400">&copy; 2024 Ashele Caleb Olusegun. All rights reserved.</p>
      </footer>

      <motion.div
        className="fixed bottom-4 right-4"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Button
          className="rounded-full bg-sky-500 text-white hover:bg-sky-600 dark:bg-sky-400 dark:text-black dark:hover:bg-sky-300"
          size="icon"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  )
}